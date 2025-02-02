import { Request, Response } from "express";
import { z } from "zod";

type ValidatorSchema = {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
};

type InferSchemaType<T> = T extends z.ZodTypeAny ? z.infer<T> : undefined;

type ValidatorHandler<TSchema extends ValidatorSchema> = (options: {
  body: TSchema["body"] extends z.ZodTypeAny ? z.infer<TSchema["body"]> : undefined;
  params: TSchema["params"] extends z.ZodTypeAny ? z.infer<TSchema["params"]> : undefined;
  req: Request;
  res: Response;
}) => Promise<any>;

export const validator = <TSchema extends ValidatorSchema>(
  schema: TSchema,
  handler: ValidatorHandler<TSchema>
) => {
  return async (req: Request, res: Response) => {
    try {
      console.log({ req })
      const validatedBody = schema.body ? await schema.body.parseAsync(req.body) : undefined;
      const validatedParams = schema.params ? await schema.params.parseAsync(req.params) : undefined;

      await handler({
        body: validatedBody as InferSchemaType<TSchema["body"]>,
        params: validatedParams as InferSchemaType<TSchema["params"]>,
        req,
        res,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}; 