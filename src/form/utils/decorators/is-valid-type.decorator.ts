import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { FieldType } from '../types/field.type';

// Define the custom constraint
@ValidatorConstraint({ async: false })
class IsValidTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const { type, options } = args.object as { type: FieldType; options?: any };

    // If the type is TEXT, options should not be present
    if (type === FieldType.TEXT) {
      return options === undefined || options.length === 0;
    }

    // For MCQ and CHECKBOX types, options must contain at least 2 elements
    return (
      (type === FieldType.MCQ || type === FieldType.CHECKBOX) &&
      options &&
      options.length >= 2
    );
  }

  defaultMessage(args: ValidationArguments): string {
    const { type, options } = args.object as { type: FieldType; options?: any };

    // Provide custom error messages based on the field type
    if (type === FieldType.TEXT) {
      return 'Field of type TEXT must not include options.';
    }
    if (type === FieldType.MCQ || type === FieldType.CHECKBOX) {
      return options && options.length < 2
        ? `Field of type ${type} must contain at least 2 elements in options.`
        : 'Invalid field configuration.';
    }
    return 'Invalid field configuration.';
  }
}

// Create the decorator
export function IsValidType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidTypeConstraint,
    });
  };
}
