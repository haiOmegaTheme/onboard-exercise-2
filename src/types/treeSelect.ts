export type Node = {
  id: string;
  label: string;
  nodes?: Node[];
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
