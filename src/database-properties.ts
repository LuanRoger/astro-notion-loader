import type { Client } from "@notionhq/client";
import { z } from "astro/zod";
import * as rawPropertyType from "./schemas/raw-properties.js";
import type { DataSourcePropertyConfigResponse } from "./types.js";

export async function propertiesSchemaForDataSource(
  client: Client,
  dataSourceId: string
) {
  const dataSource = await client.dataSources.retrieve({
    data_source_id: dataSourceId,
  });

  const schemaForDataSourceProperty: (
    propertyConfig: DataSourcePropertyConfigResponse
  ) => z.ZodTypeAny = (propertyConfig) => rawPropertyType[propertyConfig.type];

  const schema = Object.fromEntries(
    Object.entries(dataSource.properties).map(
      ([key, value]: [string, DataSourcePropertyConfigResponse]) => {
        let propertySchema = schemaForDataSourceProperty(value);
        if (value.description) {
          propertySchema = propertySchema.describe(value.description);
        }
        if (key !== "Name") {
          // propertySchema = propertySchema.optional();
        }

        return [key, propertySchema];
      }
    )
  );

  return z.object(schema);
}
