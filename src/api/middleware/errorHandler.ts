import { CustomRequest } from '../../custom';
import { Response, NextFunction, Request } from 'express';

export const ERROR_TABLE = {
  ValidationError: [400, '필드의 형식이 잘못되었습니다.', false],
  NotEnableFileType: [400, '올바른 형식의 파일이 아닙니다', false],

  InvalidAuth: [401, '잘못된 인증 정보입니다.', false],
  LoginRequired: [401, '계속하려면 로그인하셔야 합니다.', false],
  PasswordInvalid: [401, '비밀번호가 틀렸습니다.', false],
  PhoneInvalid: [401, '휴대전화 인증에 실패했습니다.', false],

  PhoneNotMatch: [402, '등록된 번호와 다릅니다.', false],

  MemberThreshold: [403, '정원을 초과했습니다.', false],
  Forbidden: [403, '권한이 없습니다.', false],
  PhoneThrottle: [403, '잠시 후 다시 시도하세요.', false],
  Throttle: [403, '잠시 후 다시 시도하세요.', false],
  AdminRequired: [403, '수정할 수 있는 권한이 없습니다.', false],
  UserDisabled: [403, '비활성화된 사용자입니다.', false],
  PurchaseRequired: [403, '결제가 필요합니다.', false],
  PurchaseFailed: [403, '결제에 실패했습니다.', false],
  CashRequired: [403, '캐시가 부족합니다.', false],

  UserNotFound: [404, '사용자를 찾을 수 없습니다.', false],
  HospitalNotFound: [404, '병원을 찾을 수 없습니다.', false],
  RegionNotFound: [404, '지역을 찾을 수 없습니다.', false],
  SurveyNotFound: [404, '설문지를 찾을 수 없습니다.', false],
  QuestionNotFound: [404, '질문을 찾을 수 없습니다.', false],
  NotFound: [404, '지정된 객체를 찾을 수 없습니다.', false],

  Timeout: [408, '요청 시간이 지났습니다.', false],

  Conflict: [409, '이미 처리되었습니다.', false],
  RegionConflict: [409, '이미 해당되는 이름의 지역이 있습니다.', false],
  NameConflict: [409, '이미 해당되는 이름이 있습니다.', false],
  NicknameConflict: [409, '이미 해당 닉네임을 가진 사용자가 있습니다.', false],
  AccountConflict: [409, '이미 해당 아이디를 가진 사용자가 있습니다.', false],
  IdentifierConflict: [409, '이미 해당 아이디를 가진 사용자가 있습니다.', false],
  EmailConflict: [409, '이미 해당 이메일을 가진 사용자가 있습니다.', false],
  PhoneConflict: [409, '이미 해당 휴대전화 번호를 가진 사용자가 있습니다.', false],

  ServerError: [500, '서버에 내부 오류가 발생했습니다.', false],
  NotImplemented: [501, '서버에서 아직 구현되지 않았습니다.', false],
} as { [key: string]: [number, string, boolean] };

function truncateStripData(data: any) {
  const output = [];
  for (const key in data) {
    if (typeof data[key] === 'string') {
      if (key === 'password' || key === 'code') {
        output.push(key + ': <REDACTED>');
        continue;
      }
      if (data[key].length > 200) {
        output.push(
          key +
            ': ' +
            data[key].slice(0, 200) +
            '... total ' +
            data[key].length +
            'chars',
        );
      } else {
        output.push(key + ': ' + data[key]);
      }
    }
  }
  return output.map((v) => '  ' + v).join('\n');
}

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let errorName, errorData;
  if (typeof error === 'string') {
    errorName = error;
  } else if (error.name != null) {
    errorName = error.name;
  }
  if (errorName === 'SequelizeUniqueConstraintError') {
    // TODO Remove hard coding
    if (error.fields[0] === 'identifier' || error.fields.email != null) {
      errorName = 'IdentifierConflict';
    } else if (error.fields[0] === 'phone' || error.fields.phone != null) {
      errorName = 'PhoneConflict';
    } else if (error.fields[0] === 'nickname' || error.fields.nickname != null) {
      errorName = 'NicknameConflict';
    } else if (error.fields[0] === 'name' || error.fields.name != null) {
      errorName = 'NameConflict';
    }
  }

  if (ERROR_TABLE[errorName]) {
    errorData = ERROR_TABLE[errorName];
  } else {
    errorName = 'ServerError';
    errorData = ERROR_TABLE.ServerError;
  }
  if (errorName === 'ValidationError' && error.data) {
    errorData[1] =
      error.data.field + ' 필드가 ' + error.data.type + ' 형식이 아닙니다.';
  } else if (error.data) {
    errorData[1] = error.data;
  }
  if (errorData[2]) {
    const errorRaw = `==== Error at ${new Date().toString()} ====
            ${req.method} ${req.originalUrl}
            IP: ${req.ip}
            Query:
            ${truncateStripData(req.query)}
            Cookies:
            ${truncateStripData(req.cookies)}
            Headers:
            ${truncateStripData(req.headers)}
            Body:
            ${truncateStripData(req.body)}
        `;
    console.error(errorRaw);
  }

  console.error(error);

  res.status(errorData[0]);
  res.json({ name: errorName, data: errorData[1] });
}
