import { Card } from "./Card"
import { FC, useEffect, useState } from "react"
import {
  Button,
  Center,
  HStack,
  Input,
  Spacer,
  Heading,
} from "@chakra-ui/react"
import { useWorkspace } from "../context/Anchor"
import { useWallet } from "@solana/wallet-adapter-react"
import { useDisclosure } from "@chakra-ui/react"
import { ReviewDetail } from "./ReviewDetail"

export const MovieList: FC = () => {
  const { program } = useWorkspace()
  const [movies, setMovies] = useState<any | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [result, setResult] = useState<any | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const wallet = useWallet()

  const fetchMyReviews = async () => {}

  const fetchAccounts = async () => {}

  useEffect(() => {
    fetchAccounts()
  }, [])

  useEffect(() => {
    if (movies && search != "") {
      const filtered = movies.filter((movie: any) => {
        return movie.account.title
          .toLowerCase()
          .startsWith(search.toLowerCase())
      })
      setResult(filtered)
    }
  }, [search])

  useEffect(() => {
    if (movies && search == "") {
      const filtered = movies.slice((page - 1) * 3, page * 3)
      setResult(filtered)
    }
  }, [page, movies, search])

  const handleReviewSelected = (data: any) => {
    setSelectedMovie(data)
    onOpen()
  }

  return (
    <div>
      <Center>
        <Input
          id="search"
          color="gray.400"
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search"
          w="97%"
          mt={2}
          mb={2}
          margin={2}
        />
        <Button onClick={fetchMyReviews}>My Reviews</Button>
      </Center>
      <Heading as="h1" size="l" color="white" ml={4} mt={8}>
        Select Review To Comment
      </Heading>
      {selectedMovie && (
        <ReviewDetail isOpen={isOpen} onClose={onClose} movie={selectedMovie} />
      )}
      {result && (
        <div>
          {Object.keys(result).map((key) => {
            const data = result[key as unknown as number]
            return (
              <Card
                key={key}
                movie={data}
                onClick={() => {
                  handleReviewSelected(data)
                }}
              />
            )
          })}
        </div>
      )}
      <Center>
        {movies && (
          <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            <Spacer />
            {movies.length > page * 3 && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </HStack>
        )}
      </Center>
    </div>
  )
}
