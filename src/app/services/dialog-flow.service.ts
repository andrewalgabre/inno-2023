import { Injectable } from '@angular/core';
import dialogflow from '@google-cloud/dialogflow';
import { environment } from 'src/environments/environment';
// Imports the Dialogflow library
const { SessionsClient } = require('@google-cloud/dialogflow').v2;
export enum Locale {
  'de' = 'de-CH',
  'en' = 'en-EU',
  'fr' = 'fr-CH',
  'it' = 'it-CH',
}

export interface DialogflowResponse {
  intent: string;
  queryText: string;
  params: any;
}

@Injectable({ providedIn: 'root' })
export class DialogFlowService {
  projectId: string;
  clientEmail: string;
  privateKey: string;

  constructor() {
    this.projectId = environment.dialogflow.projectid;
    this.clientEmail = environment.dialogflow.clientemail;
    this.privateKey = environment.dialogflow.key.replace(/\\n/g, '\n');
  }

  async detectIntent(
    sessionId: string,
    queryText: string,
    locale: Locale
  ): Promise<any> {
    const credentials = {
      client_email: this.clientEmail,
      private_key: this.privateKey,
    };
    const sessionClient = new dialogflow.SessionsClient({
      projectId: this.projectId,
      credentials,
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
      this.projectId,
      sessionId
    );

    // query dialogflow
    const result = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: { languageCode: locale, text: queryText },
      }, // resetContexts: true, -> outputContexts
    });

    if (!result[0]?.queryResult) return null;

    // map response (filter out fields starting with $ eg. "strinValue = $xxx")
    // let params = result[0].queryResult.parameters.fields;
    let params = result[0].queryResult.fulfillmentMessages[0].payload?.fields;

    params = Object.keys(params).reduce(
      (acc, cur) =>
        params[cur]?.stringValue?.startsWith('$')
          ? acc
          : { ...acc, [cur]: params[cur] },
      {}
    );

    return {
      intent: result[0].queryResult.intent.displayName,
      queryText: result[0].queryResult.queryText,
      params,
    } as DialogflowResponse;
  }
}
