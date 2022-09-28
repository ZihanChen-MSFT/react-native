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

import * as ast from './ast';
import type {File, TSTypeAnnotation} from '@babel/types';

export function parseType(type: TSTypeAnnotation):ast.Type {}

export function parseFile(file: File): ast.File {}

export function printMember(member: ast.ObjectMember): string {
  if (member.readonly) {
    return `${member.name}?: ${printType(member.type)}`;
  } else {
    return `${member.name}: ${printType(member.type)}`;
  }
}

export function printType(type: ast.Type): string {
  switch (type) {
    case 'void':
      return 'void';
    case 'null':
      return 'null';
    case 'undefined':
      return 'undefined';
    case 'boolean':
      return 'boolean';
    case 'int32':
      return 'Int32';
    case 'string':
      return 'string';
    case 'float':
      return 'float';
    case 'double':
      return 'double';
    case 'object':
      return 'object';
    case 'number_literals':
      return '"number literals"';
    case 'string_literals':
      return '"string literals"';
    case 'Stringish':
      return 'Stringish';
    case 'UnsafeObject':
      return 'UnsafeObject';
    case 'RootTag':
      return 'RootTag';
    case 'ImageSource':
      return 'ImageSource';
    case 'ColorValue':
      return 'ColorValue';
    case 'ProcessedColorValue':
      return 'ProcessedColorValue';
    case 'PointValue':
      return 'PointValue';
    case 'EdgeInsetsValue':
      return 'EdgeInsetsValue';
    default:
      switch (type.type) {
        case 'reference':
          return type.name;
        case 'array':
          return type.readonly
            ? `readonly ${printType(type.element)}[]`
            : `${printType(type.element)}[]`;
        case 'promise':
          return `Promise<${printType(type.element)}>`;
        case 'readonly':
          return `Readonly<${printType(type.element)}>`;
        case 'optional':
          return `(${printType(type.element)} | undefined)`;
        case 'with_default':
          return `WithDefault<${printType(type.element)}, ${
            type.defaultValue
          }>`;
        case 'function':
          return `(${type.argumentTypes
            .map(printType)
            .join(', ')}) => ${printTYpe(type.returnType)}`;
        case 'union':
          return `(${type.elements.map(printType).join(' | ')}})`;
        case 'enum':
          return `"enum of ${printType(type.element)}"`;
        case 'BubblingEventHandler':
          return `BubblingEventHandler<${printType(type.element)}>`;
        case 'DirectEventHandler':
          return `DirectEventHandler<${printType(type.element)}>`;
        case 'object_literal': {
          const body = `{${type.members.map(printMember).join(', ')}}`;
          if (type.mixins.length === 0) {
            return `(${type.mixins.map(printType).join(' & ')} & ${body})`;
          } else {
            return body;
          }
        }
        default:
          throw new Error(
            `Unrecognizable type: ${
              typeof type === 'string' ? type : type.type
            }`,
          );
      }
  }
}
