import React, { useState, useEffect } from "react";
import transactionsData from "../data/transactions.json";
import categoriesData from "../data/categories.json";
import merchantsData from "../data/merchants.json";
import Pagination from "../components/pagination";
import Table from "../components/table/index.js";
import SearchBar from "../components/searchBar";
import {
  processTransactions,
  getUniqueValues,
  filterByStringProperty,
  filterByNumericProperty,
} from "../utils";
import {
  SearchBarContainer,
  ResetButton,
} from "../components/searchBar/styles";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]); //The total transactions which need to be kept in state
  const [displayedTransactions, setDisplayedTransactions] = useState([]); //The transactions to be displayed on the current page which are immutable

  const [statuses, setStatuses] = useState([]); //The unique statuses which are used to filter the transactions
  const [merchants, setMerchants] = useState([]); //The unique merchants which are used to filter the transactions
  const [categories, setCategories] = useState([]); //The unique categories which are used to filter the transactions
  const [budgets, setBudgets] = useState([]); //The unique budgets which are used to filter the transactions


  const [selectedStatus, setSelectedStatus] = useState(""); //The selected status which is used to filter the transactions
  const [selectedMerchant, setSelectedMerchant] = useState(""); //The selected merchant which is used to filter the transactions
  const [selectedCategory, setSelectedCategory] = useState(""); //The selected category which is used to filter the transactions
  const [selectedBudget, setSelectedBudget] = useState(""); //The selected budget which is used to filter the transactions

  const [searchQueryTeamMember, setSearchQueryTeamMember] = useState(""); //The search query for the team member which is used to filter the transactions
  const [searchQueryAmount, setSearchQueryAmount] = useState(""); //The search query for the amount which is used to filter the transactions
  const [searchQueryGST, setSearchQueryGST] = useState(""); //The search query for the GST which is used to filter the transactions

  const [teamMemberInput, setTeamMemberInput] = useState(""); //The input value for the team member search bar
  const [amountInput, setAmountInput] = useState(""); //The input value for the amount search bar
  const [gstInput, setGstInput] = useState(""); //The input value for the GST search bar

  const [currentPage, setCurrentPage] = useState(1); //The current page number which is used to calculate the transactions to be displayed
  const [totalItems, setTotalItems] = useState(0); //The total number of transactions which is used to calculate the total number of pages
  const itemsPerPage = 10;

  // To enable the billable checkable
  const handleBillableChange = (id) => {
    setTransactions(
      transactions.map((item) =>
        item.id === id ? { ...item, billable: !item.billable } : item
      )
    );
  };

  // Reset the search queries
  const resetSearchQueries = () => {
    setSearchQueryTeamMember("");
    setSearchQueryAmount("");
    setSearchQueryGST("");
    setTeamMemberInput("");
    setAmountInput("");
    setGstInput("");
  };
  // Process the transactions data and show it in the table when the component mounts
  useEffect(() => {
    if (!transactionsData || !categoriesData || !merchantsData) {
      return;
    }
    const processedTransactions = processTransactions(
      transactionsData,
      categoriesData,
      merchantsData
    );

    setTransactions(processedTransactions);
  }, []);

  useEffect(() => {
    const statuses = getUniqueValues(transactions, "status");
    const budgets = getUniqueValues(transactions, "budget");
    const categories = getUniqueValues(categoriesData, "name");
    const merchants = getUniqueValues(merchantsData, "name");

    setStatuses(statuses);
    setMerchants(merchants);
    setCategories(categories);
    setBudgets(budgets);

  }, [transactions]);

  // Update the displayed transactions when the transactions, selected status, selected merchant, selected category, or selected budget change
  useEffect(() => {
    // The default value of filteredTransactions is the total transactions
    let filteredTransactions = transactions;

    // If a selected status is provided, filter the transactions by status as the first step
    const filters = [
      { key: "category", value: selectedCategory },
      { key: "status", value: selectedStatus },
      { key: "merchant", value: selectedMerchant },
      { key: "budget", value: selectedBudget },
    ];

    filters.forEach((filter) => {
      if (filter.value) {
        filteredTransactions = filteredTransactions.filter(
          (item) => item[filter.key] === filter.value
        );
      }
    });

    // If a search query is provided, filter the transactions by the search query as the second step
    if (searchQueryTeamMember) {
      filteredTransactions = filterByStringProperty(
        filteredTransactions,
        "team_member",
        searchQueryTeamMember
      );
    }

    if (searchQueryAmount) {
      filteredTransactions = filterByNumericProperty(
        filteredTransactions,
        "amount",
        searchQueryAmount
      );
    }

    if (searchQueryGST) {
      filteredTransactions = filterByNumericProperty(
        filteredTransactions,
        "gst",
        searchQueryGST
      );
    }

    // Update the total items and displayed transactions based on the filtered transactions
    setTotalItems(filteredTransactions.length);

    const newDisplayedTransactions = filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setDisplayedTransactions(newDisplayedTransactions);
  }, [
    currentPage,
    transactions,
    selectedStatus,
    selectedMerchant,
    selectedCategory,
    selectedBudget,
    searchQueryTeamMember,
    searchQueryAmount,
    searchQueryGST,
  ]);

  // Reset the current page to 1 when the selected status, selected merchant, selected category, or selected budget change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedStatus, selectedMerchant, selectedBudget]);



  return (
    <div>
      <SearchBarContainer data-testid="searchbar-container">
        <SearchBar
          setSearchQuery={setSearchQueryTeamMember}
          inputValue={teamMemberInput}
          setInputValue={setTeamMemberInput}
          placeholder="Team Member"
        />
        <SearchBar
          setSearchQuery={setSearchQueryAmount}
          inputValue={amountInput}
          setInputValue={setAmountInput}
          placeholder="Amount"
        />
        <SearchBar
          setSearchQuery={setSearchQueryGST}
          inputValue={gstInput}
          setInputValue={setGstInput}
          placeholder="GST"
        />
        <ResetButton onClick={resetSearchQueries}>Reset</ResetButton>
      </SearchBarContainer>
      <Table
        data={displayedTransactions}
        statuses={statuses}
        categories={categories}
        merchants={merchants}
        budgets={budgets}
        setSelectedCategory={setSelectedCategory}
        setSelectedStatus={setSelectedStatus}
        setSelectedMerchant={setSelectedMerchant}
        setSelectedBudget={setSelectedBudget}
        handleBillableChange={handleBillableChange}
      />
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TransactionsTable;
