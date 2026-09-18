import { getAllPoems } from "../../lib/poetry";
import PoetryClient from "./PoetryClient";

export default function PoetryPage() {
  const poems = getAllPoems();

  return <PoetryClient poems={poems} />;
}