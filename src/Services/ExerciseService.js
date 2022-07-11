//Male and Female BMR calculation based on unit type
export const calculateMaleBMRImperial = (feet, inches, weight, age) => {
  const height = Math.round(((+feet) * 12 + (+inches)) * 2.54);
  const weightKG = Math.round(+weight / 2.2);
  return Math.round(66.5 + 13.75 * (+weightKG) + 5.003 * (+height) - 6.755 * (+age));
};

export const calculateFemaleBMRImperial = (feet, inches, weight, age) => {
  const height = Math.round(((+feet) * 12 + (+inches)) * 2.54);
  const weightKG = Math.round((+weight) / 2.2);
  return Math.round(655 + 9.563 * (+weightKG) + 1.85 * (+height) - 4.676 * (+age));
};

export const calculateBMRSimplified = (
  gender,
  unit,
  feet,
  inches,
  weight,
  age
) => {
  if (gender === "male") {
    return unit === "kgs" ?  calculateMaleBMRMetric(feet, weight, age) :  calculateMaleBMRImperial(feet, inches, weight, age);
  } else if (gender === "female") {
    return unit === "kgs" ?  calculateFemaleBMRMetric(feet, weight, age) : calculateFemaleBMRImperial(feet, inches, weight, age);
  }
};
export const calculateMaleBMRMetric = (height, weight, age) => {
  return Math.round(66.5 + 13.75 * (+weight) + 5.003 * (+height) - 6.755 * (+age));
};

export const calculateFemaleBMRMetric = (height, weight, age) => {
  return Math.round(655 + 9.563 * (+weight) + 1.85 * (+height) - 4.676 * (+age));
};

export const calculateBMRWithExSedentary = (bmr) => {
  return Math.round((+bmr) * 1.2);
};

export const calculateBMRWithExLight = (bmr) => {
  return Math.round((+bmr) * 1.375);
};

export const calculateBMRWithExModerate = (bmr) => {
  return Math.round((+bmr) * 1.55);
};

export const calculateBMRWithExVery = (bmr) => {
  return Math.round((+bmr) * 1.725);
};

export const calculateBMRWithExExtra = (bmr) => {
  return Math.round((+bmr) * 1.9);
};
