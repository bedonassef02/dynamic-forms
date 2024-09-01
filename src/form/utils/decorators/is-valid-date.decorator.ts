import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Define the custom constraint
@ValidatorConstraint({ async: false })
class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    // Parse the input date if it's a string
    const date = typeof value === 'string' ? new Date(value) : value;

    // Ensure the value is a valid Date instance and is not NaN
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return false;
    }

    const currentDate = new Date();
    const validTo = (args.object as any).validTo
      ? new Date((args.object as any).validTo)
      : null;

    // Check if the date is in the past (only if value is validFrom)
    if (args.property === 'validFrom' && date < currentDate) {
      return false;
    }

    // Check if validTo is greater than the given date (validFrom)
    if (args.property === 'validFrom' && validTo && validTo <= date) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const { value, property } = args;
    const currentDate = new Date();
    const validTo = (args.object as any).validTo;

    if (property === 'validFrom' && new Date(value) < currentDate) {
      return 'The validFrom date must be in the future.';
    }

    if (
      property === 'validFrom' &&
      validTo &&
      new Date(validTo) <= new Date(value)
    ) {
      return 'The validTo date must be greater than the validFrom date.';
    }

    return 'Invalid date value.';
  }
}

// Create the decorator
export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateConstraint,
    });
  };
}
