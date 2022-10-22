import { votingSpecs } from "../contexts/VoteContext";

export function FindArrById(array: votingSpecs[], id: string|number) {
  const numberId = Number(id);
  return array.find(arr => arr.Id === Number(numberId));
}
