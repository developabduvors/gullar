// Biznes mantiqda qulay xato tashlash uchun: throw new ApiError(404, 'Gul topilmadi')
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = ApiError;
