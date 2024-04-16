export interface Servers {
  id: string;
  name: string;
  protocol: string;
  host: string;
  port: string;
  username: string;
  password: string;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Users {
  id: number;
  email: string;
  username: string;
  name: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

export interface CPU_Utilization {
  time: number;
  cpu: string;
}

export interface Memory_Utilization {
  time: number;
  memory: string;
}

export interface ServerStats {
  BASE_DIR: string;
  DATA_DIR: string;
  SIZE: any[];
  UPTIME: string;
  VERSION: string;
}
