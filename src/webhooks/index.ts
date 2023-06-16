import crypto from "crypto";
import { IncomingHttpHeaders } from "http2";
const scmp = require("scmp");

export interface Request {
  protocol: string;
  header(name: string): string | undefined;
  headers: IncomingHttpHeaders;
  originalUrl: string;
  query: any;
}

export interface WebhookOptions {
  apiKey: string;
}

/**
 Utility function to get the expected signature for a given request

 @param apiKey - The auth token, as seen in the Boom portal
 @param url - The full URL (with query string) you configured to handle
 this request
 @param params - the parameters sent with this request
 @returns signature
 */
function getExpectedSignature(apiKey: string, data: string): string {
  return crypto
    .createHmac("sha1", apiKey)
    .update(Buffer.from(data, "utf-8"))
    .digest("base64");
}

function validateExpressRequest(request: Request, apiKey: string): boolean {
  const boomHeader = request.query["X-Boom-Signature"].replace(/\s/g, "+");

  const signature = getExpectedSignature(
    apiKey,
    request.query.paymentIntentId || "a46c0849-c572-4b46-9da3-cfc2eb35121f"
  );

  const isValid = scmp(Buffer.from(boomHeader), Buffer.from(signature));

  return isValid;
}

export default function Webhook(
  apiKey: string
): () => (req: any, res: any, next: any) => void {
  // Create middleware function
  return function () {
    return function hook(request, response, next) {
      // Do validation if requested
      // Check if the 'X-Boom-Signature' header exists or not
      if (!request.query["X-Boom-Signature"]) {
        return response
          .type("text/plain")
          .status(400)
          .send(
            "No signature header error - X-Boom-Signature header does not exist, maybe this request is not coming from Boom."
          );
      }
      // Check for a valid auth token
      if (!apiKey) {
        console.error(
          "[Boom]: Error - Boom API KEY is required for webhook request validation."
        );
        response
          .type("text/plain")
          .status(500)
          .send(
            "Webhook Error - we attempted to validate this request without first configuring our API KEY."
          );
      } else {
        // Check that the request originated from Boom
        var valid = validateExpressRequest(request, apiKey);

        if (valid) {
          next();
        } else {
          return response
            .type("text/plain")
            .status(403)
            .send("Boom Request Validation Failed.");
        }
      }
    };
  };
}
