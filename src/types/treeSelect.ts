import { RegionInfo } from '.';

export type Node = RegionInfo & {
  id: string;
  label: string;
  parentId: string;
  nextLevelIds: string[];
  nodes?: Node[];
  alternativeName?: string;
};

export type BaseOptions = {
  value: string;
  label: string;
  name: string;
};

interface StatusInfo {
  status: number;
}
interface Geo {
  description: string;
  country_code: string;
  parent_id: number;
  id: number;
  type: number;
}
interface AssociateTag {
  name: string;
  geo: Geo;
  format_type: number;
  status_info: StatusInfo;
}

export type SearchLocationData = {
  resp_context: {
    associate_tags: AssociateTag[];
  };
  result: {
    v: AssociateTag[];
  };
};
