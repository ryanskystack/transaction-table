import React from "react";
import PropTypes from "prop-types";
import { columnNames, columnKeys } from "../../constants/columns";
import FilterDropdown from "../FilterDropdown";
import { StyledTable, StyledHeader, StyledRow, StyledCell } from "./styles";

const Table = ({
  data,
  statuses,
  categories,
  merchants,
  budgets,
  setSelectedCategory,
  setSelectedStatus,
  setSelectedMerchant,
  setSelectedBudget,
  handleBillableChange,
}) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {columnNames.map((name) => (
            <StyledHeader key={name}>
              {name}
              {name === "Status" && (
                <FilterDropdown
                  name="Status"
                  options={statuses}
                  setSelectedOption={setSelectedStatus}
                />
              )}
              {name === "Merchant Name" && (
                <FilterDropdown
                  name="Merchant Name"
                  options={merchants}
                  setSelectedOption={setSelectedMerchant}
                />
              )}
              {name === "Category" && (
                <FilterDropdown
                  name="Category"
                  options={categories}
                  setSelectedOption={setSelectedCategory}
                />
              )}
              {name === "Budget" && (
                <FilterDropdown
                  name="Budget"
                  options={budgets}
                  setSelectedOption={setSelectedBudget}
                />
              )}
            </StyledHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <StyledRow key={`${index}-${item.id}`}>
            {columnKeys.map((key) => (
              <StyledCell key={`${index}-${key}-${item.id}`}>
                {key === "receipt" || key === "billable" ? (
                  <input
                    type="checkbox"
                    checked={item[key]}
                    onChange={
                      key === "billable"
                        ? () => handleBillableChange(item.id)
                        : undefined
                    }
                    readOnly={key === "receipt"}
                  />
                ) : (
                  item[key]
                )}
              </StyledCell>
            ))}
          </StyledRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  budgets: PropTypes.array.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  setSelectedMerchant: PropTypes.func.isRequired,
  setSelectedBudget: PropTypes.func.isRequired,
};

export default Table;
