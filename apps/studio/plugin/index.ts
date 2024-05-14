import { ReactNode } from 'react';
import {
  defineArrayMember,
  defineField,
  definePlugin,
  defineType,
} from 'sanity';
import { StructureBuilder } from 'sanity/structure';

type Base<T = string> = {
  type: T;
  preview?: boolean;
  title?: string;
  icon?: ReactNode;
};

type CreateList = {
  S: StructureBuilder;
} & Base;

export const abTest = (schemaTypes: string[]) =>
  defineType({
    name: 'abTest',
    title: 'AB Test',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
      }),
      defineField({
        name: 'enabled',
        title: 'Enabled',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'variants',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'reference',
            to: schemaTypes.map((type) => ({ type })),
          }),
        ],
      }),
    ],
  });

const createList = ({ S, type, icon }: CreateList) =>
  S.documentTypeListItem(type).title('A/B Testing').icon(icon);

export const abTestStructureList = (S: StructureBuilder) =>
  createList({ S, type: 'abTest' });

export type PluginConfig = {
  schemaTypes: string[];
  apiVersion?: string;
  featureField?: string;
};

export const abTestPlugin = definePlugin<PluginConfig>((config) => {
  const { schemaTypes, apiVersion, featureField } = config;

  return {
    name: 'ab-test-plugin',
    schema: {
      types: [abTest(schemaTypes)],
    },
  };
});
