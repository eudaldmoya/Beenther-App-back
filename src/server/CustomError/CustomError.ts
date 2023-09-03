class CustomError extends Error {
  constructor(
    message: string,
    public status: number,
    public privateMessage: string,
  ) {
    super(message);
  }
}

export default CustomError;
