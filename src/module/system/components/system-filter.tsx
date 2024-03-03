import SearchInput from "@components/search-input";
import { Button, Flex, Select } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const SystemFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStatusFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  return (
    <Flex align="center" gap="md">
      <SearchInput />
      <Select
        searchable
        placeholder="Select Status"
        data={[]}
        clearable
        value={searchParams.get("status") || ""}
        onChange={(value: string | null) => handleStatusFilter("status", value)}
        style={{
          textTransform: "capitalize",
        }}
      />
      <Button
        leftSection={<IoMdAdd size={14} />}
        variant="light"
        component="a"
        href={AppRoute.create_system}
      >
        Create System
      </Button>
    </Flex>
  );
};

export default SystemFilter;