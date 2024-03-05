import { processTransactions } from "../../../src/utils";
describe("utils - processTransactions", () => {
  it("should replace category and merchant IDs with their respective names", () => {
    const transactionsData = [
      {
        id: "1",
        status: "complete",
        date: "2022-01-01",
        merchant: "merchant1",
        team_member: "John Doe",
        budget: "1000",
        receipt: true,
        billable: false,
        gst: 10,
        amount: 100,
        category: "category1",
      },
    ];

    const categoriesData = [
      {
        id: "category1",
        name: "Groceries",
      },
    ];

    const merchantsData = [
      {
        id: "merchant1",
        name: "Walmart",
      },
    ];

    const result = processTransactions(
      transactionsData,
      categoriesData,
      merchantsData
    );

    expect(result).toEqual([
      {
        id: "1",
        status: "complete",
        date: "2022-01-01",
        merchant: "Walmart",
        team_member: "John Doe",
        budget: "1000",
        receipt: true,
        billable: false,
        gst: 10,
        amount: 100,
        category: "Groceries",
      },
    ]);
  });
});
