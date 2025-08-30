export default interface ValidationErrors {
  errors: {
    [key: string]: string[];
  };
}