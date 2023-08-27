export enum ConditionType {
  ABOVE = 'ABOVE',
  BELOW = 'BELOW',
  EQUAL = 'EQUAL',
}

export enum OperationType {
  AND = 'AND',
  OR = 'OR',
}

export interface CheckSingleBlockArg {
  condition: string;
  targetPoint: number;
  value: number;
}

export interface MeState {
  [key: string]: number;
}

export interface Condition {
  data_point: string;
  condition: ConditionType;
  value: number;
  operation: OperationType | null;
}

export interface MintType {
  mint: string;
  owner: string;
  amount: string;
}

export interface ExchangeCodeResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface TwitterUser {
  space_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  stay_time: number;
}
