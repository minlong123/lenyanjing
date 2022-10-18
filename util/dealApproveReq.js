import { startGpdSafebook } from "@/api/implement/qualityledger";
export function dealApproveReq(name) {
  switch (name) {
    case "安全台账记录":
      return startGpdSafebook;
      break;
    default:
      break;
  }
}

module.exports = {
  dealApproveReq,
};
