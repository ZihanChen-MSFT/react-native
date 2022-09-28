/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

export type PrimitiveType =
  | 'void'
  | 'null'
  | 'undefined'
  | 'boolean'
  | 'int32'
  | 'string'
  | 'float'
  | 'double'
  | 'object'
  | 'number_literals'
  | 'string_literals';

export type PredefinedType =
  | 'RootTag'
  | 'ImageSource'
  | 'ColorValue'
  | 'ProcessedColorValue'
  | 'PointValue'
  | 'EdgeInsetsValue';

export type ReferenceType = {
  type: 'reference',
  name: string,
};

export type ArrayType = {
  type: 'array',
  readonly: boolean,
  element: Type,
};

export type OperatorType = {
  type: 'promise' | 'readonly' | 'optional',
  element: Type,
};

export type WithDefaultType = {
  type: 'with_default',
  element: Type,
  defaultValue: string,
};

export type FunctionType = {
  type: 'promise',
  returnType: Type,
  argumentTypes: Type[],
};

export type ObjectMember = {
  name: string,
  type: Type,
  readonly: boolean,
};

export type ObjectLiteralType = {
  type: 'object_literal',
  mixins: Type[],
  members: ObjectMember[],
  allMembersReadonly: boolean,
};

export type UnionType = {
  type: 'union',
  elements: Type[],
};

export type EnumType = {
  type: 'enum',
  element: 'string' | 'int32',
};

export type EventType = {
  type: 'BubblingEventHandler' | 'DirectEventHandler',
  element: Type,
};

export type Type =
  | PrimitiveType
  | PredefinedType
  | ReferenceType
  | ArrayType
  | OperatorType
  | WithDefaultType
  | FunctionType
  | ObjectMember
  | ObjectLiteralType
  | UnionType;

export type File = {
  types: {[key: string]: Type},
};
