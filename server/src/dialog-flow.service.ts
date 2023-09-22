import dialogflow from '@google-cloud/dialogflow';
import { Injectable } from '@nestjs/common';
// Imports the Dialogflow library
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

@Injectable()
export class DialogFlowService {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  dialogflow = {
    key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZmZHSBB6VVjY6\nGKY4+9Sj+/U/3vbK0mbK7W6x2xqMx4Gy0ZK3cm4C/3SIgdTJTcpNIujxuHHeB0Jm\nR8QjWqLhA0dS61r+Lskw+h/PiHXXGG+xiOuKBBQEoNWaFaZXwQAik3F8Jn7b8ms+\npb1es5lxRqFNgree1pP2pqo69MIPTVMIyLTaduTr2wWXsYGfLSAkRGJyWfFecVy4\nvHayIu/ShBr5OH+rcFxoHZLLQANVcEzW4VDMw8d6MmBFiim/u8k/CkZadUzPpRNl\n6daxtCbsPM/OprM25xr1OovGrMSvQpp4qE8Xx8vDIaW96yPvYNoDeZ1nadFDjG6x\ngDVFa32xAgMBAAECggEAFJLxFybdj2gl22teOBAThGe7wgy+T+IB5xj4+OcLBRmN\n+U7YbPDsVus5ZPjFmjz5Lj7pQIWceo48KHiLon4c3WKWeVAYe+UHj9JudIxl++7r\nDKGyB4woKmHcoGOApVZxwVMojUEEiJ5MppE8LPqVPQEdGjuMSf/m4JDUkpt2x8Ru\nt+GE6c6PS5UnfPN1CFgxRBb/BbOjOLOXayrZu3unm3gL0fNgfbbyONGwhbhysdXJ\n9G05JSIUAF66I0Y8oR1ZHHhyI3TpQmEVqCd+47sBwiELDiUV4jeUfIurtlUeKTac\n8UiabTe9djuga2ULF0ZqQ25fgQF/lEiL3LfY6WRqoQKBgQDz9rJs8oQ71nPb0v11\nYIzpvIWTZcubECbjQY4yBNG0Db32kTTnmTYJWnQ0K7NFofPC0yrYfqmIP42w56Nq\nEZQEiv4lNUSkBuWIIabMeeBPW9vrqNXHtrhxA5NMzkS1ZdKQGaYiKzAypIYBPnH7\nLz7UOSXJt9k1oao/G+OvoxYSiQKBgQDkVeTBG1faoikgt2HFuv3DQKGTItaOenaC\nhfByUJfwI4/Sz95PlSdCw8vkywNQjza6TR6o9TT99KYHA33bfZJJSUpid1cXvZmY\nj01DYwZzpC0I803pxhDY/rj6wumOvxZsvkFV2k3TP7zkzT9siHZndk993Ji+QyAh\nMkOcFAPn6QKBgCr2NaOT7Y9wC4UZmcLS1t3OciNr2Lgc1wxMHhNW3+r6RIqoNY3X\nYDmzcSVC0NYhWADmGPR5EbfJoVUW5aMnJ07Jf0nkIItWH5OigXIewE6ZWZgdalA6\nMC7Ot2DeLiFXpgX0TlpUCq/QYzzS11Wpk0HiMnJcaubT6lwkuCrU6G0pAoGAV8DX\nCIwcqI735XX04owp6LdXIXgbI2jXUPRu41AsBIN2S9vNoaI+E3+yRbzsCjLwIotv\nBBoxAoTapglmfkt1RCshplQdKaeZdzNjy0ksepcXI8B2KikP4oWKy/zKzCyOTr6T\n143tqQlu7DQhcvHDJ6IljMaSAVVE7N0ndL2QfrkCgYA9x21w/qb86OgMUDLld5rr\nqoJFi1KGKmoHphL7R9dmK4Mf92KxeAHzUuEbm7b0vD7GGTQGYnHlpqnv4mt+P0my\nH7rG6HGafgAKFlHyn4YoZUW4nvusAPpNF5d3CbSatl5fVHGiDAQg8Hubr95FGNSe\nrDsQ4CX40CB+agw7+in5TA==\n-----END PRIVATE KEY-----\n',
    clientemail: 'dialogflow@inno-2023.iam.gserviceaccount.com',
    projectid: 'inno-2023',
  };

  constructor() {
    this.projectId = this.dialogflow.projectid;
    this.clientEmail = this.dialogflow.clientemail;
    this.privateKey = this.dialogflow.key.replace(/\\n/g, '\n');
  }

  async detectIntent(
    sessionId: string,
    queryText: string,
    locale: Locale,
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
      sessionId,
    );

    // query dialogflow
    const result = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: { languageCode: locale, text: queryText },
      }, // resetContexts: true, -> outputContexts
    });

    if (!result[0]?.queryResult) return null;

    console.log(result[0].queryResult.parameters);

    // map response (filter out fields starting with $ eg. "strinValue = $xxx")
    // let params = result[0].queryResult.parameters.fields;
    let params = result[0].queryResult.fulfillmentMessages[0].payload?.fields;

    params = Object.keys(params).reduce(
      (acc, cur) =>
        params[cur]?.stringValue?.startsWith('$')
          ? acc
          : { ...acc, [cur]: params[cur] },
      {},
    );

    return {
      intent: result[0].queryResult.intent.displayName,
      queryText: result[0].queryResult.queryText,
      params,
    } as DialogflowResponse;
  }
}
