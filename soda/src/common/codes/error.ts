export const PrismaErrors = {
  AuthenticationFailed: 'P1000',
  CouldNotConnectToDatabase: 'P1001',
  ConnectionTimedOut: 'P1002',
  DatabaseFileNotFound: 'P1003',
  OperationsTimedOut: 'P1008',
  DatabaseAlreadyExists: 'P1009',
  AccessDeniedForUser: 'P1010',
  TLSConnectionError: 'P1011',
  Error: 'P1012',
  InvalidDatabaseString: 'P1013',
  KindForModelDoesNotExist: 'P1014',
  UnsupportedFeaturesAtPrismaSchema: 'P1015',
  FailedToCreateDatabase: 'P3000',
  PossibleDestructiveOrDataLossChanges: 'P3001',
  MigrationRolledBack: 'P3002',
  InvalidMigrationFormat: 'P3003',
  SystemDatabaseNotSupported: 'P3004',
  DatabaseNotEmpty: 'P3005',
  CouldNotApplyCleanlyToTemporaryDatabase: 'P3006',
  PreviewFeaturesNotAllowedInMigrationEngine: 'P3007',
  MigrationAlreadyApplied: 'P3008',
  FailedMigrationsFound: 'P3009',
  MigrationNameTooLong: 'P3010',
  CannotRollBackANeverAppliedMigration: 'P3011',
  CannotRollBackANotFailedMigration: 'P3012',
  DatasourceProviderArraysNotSupported: 'P3013',
  DatasourceProviderDontMatchMigrationLock: 'P3014',
  ValueTooLongForColumnType: 'P2000',
  RecordDoesNotExist: 'P2001',
  UniqueConstraintViolation: 'P2002',
  ForeignConstraintViolation: 'P2003',
  ContraintViolation: 'P2004',
  InvalidValueForFieldType: 'P2005',
  InvalidValue: 'P2006',
  ValidationError: 'P2007',
  QueryParsingError: 'P2008',
  QueryValidationError: 'P2009',
  RawQueryError: 'P2010',
  NullConstraintViolation: 'P2011',
  MissingRequiredValue: 'P2012',
  MissingRequiredArgument: 'P2013',
  RequiredRelationViolation: 'P2014',
  RelatedRecordNotFound: 'P2015',
  InterpretationError: 'P2016',
  RecordsForParentAndChildNotConnected: 'P2017',
  RequiredConnnectedRecordsNotFound: 'P2018',
  InputError: 'P2019',
  ValueOutOfRange: 'P2020',
  TableDoesNotExist: 'P2021',
  ColumnDoesNotExist: 'P2022',
  InconsistentColumnData: 'P2023',
  TimedOutFetchingConnectionFromThePool: 'P2024',
  // custom
  RecordToUpdateNotFound: 'P2025',
} as const;

const ErrorCodes = {
  LocalAuthFailed: 'E1000',
  AuthFailed: 'E1001',
  RefreshAuthFailed: 'E1002',
  InvalidRequest: 'E1003',
} as const;


export const errorCodes = {
  ...PrismaErrors,
  ...ErrorCodes,
} as const;

export type ErrorType = keyof typeof errorCodes;
export type ErrorCode = typeof errorCodes[ErrorType];

const errorTypes: Partial<Record<ErrorType, ErrorCode>>= {}

Object.keys(errorCodes).forEach((key: ErrorCode) => {
  errorTypes[errorCodes[key]] = key;
})

export { errorTypes };

