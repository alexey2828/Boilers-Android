const getRandomSensorOffset = () =>
  Number((Math.random() * 0.89 + 0.01).toFixed(2));

const addOffsetToNumber = (value: any) => {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return Number((numericValue + getRandomSensorOffset()).toFixed(2));
};

export const addRandomSensorValuesOffset = (
  sensorValues: Record<string, any> | null,
) => {
  if (!sensorValues) {
    return sensorValues;
  }

  return Object.entries(sensorValues).reduce((acc, [key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      acc[key] = {
        ...value,
        valueParamTMP: addOffsetToNumber(value.valueParamTMP),
      };
      return acc;
    }

    acc[key] = addOffsetToNumber(value);
    return acc;
  }, {} as Record<string, any>);
};

export const formatCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
