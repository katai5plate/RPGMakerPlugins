const debugLog = (
  logs = [],
  groupName = `${Date.now()}`,
  enableTrace = false
) => {
  console.group(groupName);
  for (let log of logs) console.log(...log);
  if (enableTrace) {
    console.groupCollapsed("trace");
    console.trace();
    console.groupEnd();
  }
  console.groupEnd();
};

export default debugLog; /***__HIDDEN__***/
