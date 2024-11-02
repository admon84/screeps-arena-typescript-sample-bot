// Capture the Flag roles
export enum RoleCTF {
  Sample = 101,
}

// Spawn and Swamp roles
export enum RoleSAS {
  Sample = 201,
}

// Collect and Control roles
export enum RoleCAC {
  Sample = 301,
}

// Tutorial roles
export enum RoleTUT {
  Harvester = 401,
  Attacker,
}

export type Role = RoleTUT | RoleCTF | RoleSAS | RoleCAC;
