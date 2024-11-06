import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
  campus: string | null | undefined;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3100/financial-records/getAllByUserID/${user.id}`
    );

    if (response.ok) {
      const allRecords = await response.json();

      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const filteredRecords = allRecords.filter((record: any) => {
        const date = new Date(record.date);
        return (
          date.getDate() === currentDay &&
          date.getMonth() + 1 === currentMonth &&
          date.getFullYear() === currentYear &&
          record.campus === record.user.userName
        );
      });

      setRecords(filteredRecords);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("http://localhost:3100/financial-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newRecord = await response.json();
      setRecords((prev) => [...prev, newRecord]);
    }
  };

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    const response = await fetch(
      `http://localhost:3100/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updatedRecord = await response.json();
      setRecords((prev) =>
        prev.map((record) => (record._id === id ? updatedRecord : record))
      );
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `http://localhost:3100/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const deletedRecord = await response.json();
      setRecords((prev) =>
        prev.filter((record) => record._id !== deletedRecord._id)
      );
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
