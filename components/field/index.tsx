import React from 'react';

type FieldType = 'text' | 'tel' | 'digit' | 'number' | 'password';

interface FieldProps {
  label: string;
  type: FieldType;
}

function Field(props: FieldProps) {
  const { label, type } = props;
  return (
    <>
      <label>{label}</label>:{type}
    </>
  );
}

export default Field;
