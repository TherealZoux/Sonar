import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  Field,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { useSearch } from "@/hooks/usePodcasts"
import { useSearchStore } from "@/stores/useSearchStore"

export function SearchComponent() {

  // 1. Tracks what the user is currently typing
  const [inputValue, setInputValue] = useState('');
  // 2. This state only updates when the button is clicked
  const [searchTerm, setSearchTerm] = useState('');
  // 3. The hook now listens to 'searchTerm', not the live typing
  const { result, searchLoader } = useSearch(searchTerm);

  const setResults = useSearchStore((state) => state.setResults);
  const setTerm = useSearchStore((state) => state.setSearchTerm);

  const handleSearch = () => {
    setSearchTerm(inputValue);
    setTerm(searchTerm)
  };
  useEffect(() => {
    setResults(result || []);
    console.log(result);
    
  }, [result, searchLoader, setResults ]);


  return (
    <div className="flex gap-4">
      <Field className="">
        <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:border-red-500 has-[[data-slot=input-group-control]:focus-visible]:ring-orange-500/10 bg-white py-6 px-4 rounded-xl">
          <InputGroupInput id="inline-start-input" placeholder="Search podcasts, episodes, creators..." className="has-[:focus-visible]:border-red-500 placeholder:text-[1.3rem] placeholder:text-[#9CA3AF] text-[1.2rem]!" onChange={(e) => setInputValue(e.target.value)} />
          <InputGroupAddon align="inline-start" className="pr-3">
            <SearchIcon className="text-muted-foreground size-[1.6rem]  " />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Button className="bg-[var(--color-sidebar-accent-foreground)] h-[3rem] text-[1.3rem] w-[7rem] rounded-3xl" onClick={handleSearch}>Search</Button>

    </div>
  )
}

