import { Redeem } from "src/entities/redeem.entity";

export const tranformRedeems = (redeem: Redeem) => {
  return {
    id: redeem.id,
    fromFirstName: redeem.fromFirstName,
    fromLastName: redeem.fromLastName,
    toFirstName: redeem.toFirstName,
    toLastName: redeem.toLastName,
    toPhone: redeem.toPhone,
    redeemCode: redeem.redeemCode,
    status: redeem.status,
    created: redeem.created,
  }
}