import { Container } from "@/components/Container";

export function Contract() {
  const columns = [
    "Registration Number",
    "Model",
    "Bidder",
    "Ownership",
    "Date",
    "Auction House",
    "Actions",
  ];

  return (
    <Container>
      <div className="text-center">
        <p className="text-5xl sm:text-6xl text-primary my-4">CONTRACTS</p>
        <p className="my-8 text-xl">List of Contracts</p>
      </div>
      <div className="overflow-x-auto text-center sm:mx-20 overflow-y-hidden sm:px-20">
        <table className="min-w-full divide-y">
          <thead className="bg-secondary">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-3 left text-sm sm:text-lg font-medium uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-center text-xs sm:text-sm">
            <tr>
              {columns.map((_, i) => (
                <td key={i} className="px-6 py-4 whitespace-nowrap">
                  content {i + 1}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}
