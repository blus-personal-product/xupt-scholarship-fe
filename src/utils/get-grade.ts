const getGrade = (studentGrade?: string) => ((new Date()).getFullYear() - (+(studentGrade || '')) + 1);

export default getGrade;