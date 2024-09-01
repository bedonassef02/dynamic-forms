import { BadRequestException } from '@nestjs/common';
import { Answer } from '../../../submit/utils/answer.interface';
import { FormField } from '../interfaces/form-field.interface';
import { FieldType } from '../types/field.type';

// Validate answers against form fields
export const validateAnswers = (fields: FormField[], answers: Answer[]) => {
  const errors: string[] = [];
  const answerMap = createAnswerMap(answers);

  fields.forEach((field) => {
    const answer = answerMap.get(field.id);

    // Validate if the field is required but not answered
    validateRequiredField(field, answer, errors);

    // Perform further validation if the answer exists
    if (answer) {
      validateAnswerByFieldType(field, answer, errors);
    }
  });

  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }
};

// Create a map of answers for quick lookup
const createAnswerMap = (answers: Answer[]): Map<string, string[]> => {
  const answerMap = new Map<string, string[]>();
  answers.forEach((answer) => {
    answerMap.set(answer.id, answer.answer);
  });
  return answerMap;
};

// Validate if a required field has an answer
const validateRequiredField = (
  field: FormField,
  answer: string[] | undefined,
  errors: string[],
) => {
  if (field.required && !answer) {
    errors.push(`The field "${field.title}" ${field.id} is required.`);
  }
};

// Validate answers based on field type
const validateAnswerByFieldType = (
  field: FormField,
  answer: string[],
  errors: string[],
) => {
  switch (field.type) {
    case FieldType.TEXT:
      validateTextField(field, answer, errors);
      break;

    case FieldType.MCQ:
      validateMCQField(field, answer, errors);
      break;

    case FieldType.CHECKBOX:
      validateCheckboxField(field, answer, errors);
      break;

    default:
      errors.push(`Unknown field type for "${field.title}" ${field.id}.`);
      break;
  }
};

// Validate text field answers
const validateTextField = (
  field: FormField,
  answer: string[],
  errors: string[],
) => {
  if (!field.multipleChoice && answer.length > 1) {
    errors.push(
      `The field "${field.title}" ${field.id} expects a single answer.`,
    );
  }
};

// Validate MCQ field answers
const validateMCQField = (
  field: FormField,
  answer: string[],
  errors: string[],
) => {
  answer.forEach((ans) => {
    if (!field.options.includes(ans)) {
      errors.push(
        `The answer "${ans}" is not a valid option for the field "${field.title}" ${field.id}.`,
      );
    }
  });

  if (!field.multipleChoice && answer.length > 1) {
    errors.push(
      `The field "${field.title}" ${field.id} does not allow multiple choices.`,
    );
  }
};

// Validate checkbox field answers
const validateCheckboxField = (
  field: FormField,
  answer: string[],
  errors: string[],
) => {
  answer.forEach((ans) => {
    if (!field.options.includes(ans)) {
      errors.push(
        `The answer "${ans}" is not a valid option for the field "${field.title}" ${field.id}.`,
      );
    }
  });
};
