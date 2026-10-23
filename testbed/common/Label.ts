export const getLabel = (obj: any) => {
  if (obj.lookupId) {
    return obj.lookupId;
  }
  if (obj.spaceName) {
    return obj.spaceName;
  }
  return null;
};

export const setLabel = (obj: any, id: string) => {
  obj.lookupId = id;
};
