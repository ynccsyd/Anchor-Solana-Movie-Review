import {
  Button,
  Center,
  HStack,
  Spacer,
  Stack,
  Box,
  Heading,
} from "@chakra-ui/react"
import { FC, useState, useEffect } from "react"
import { useWorkspace } from "../context/Anchor"

interface CommentListProps {
  movie: any
}

export const CommentList: FC<CommentListProps> = ({
  movie,
}: CommentListProps) => {
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState<any[]>([])
  const [result, setResult] = useState<any[]>([])
  const { program } = useWorkspace()

  useEffect(() => {
    const fetch = async () => {}
    fetch()
  }, [page])

  return (
    <div>
      <Heading as="h1" size="l" ml={4} mt={2}>
        Existing Comments
      </Heading>
      {result.map((comment, index) => (
        <Box
          p={4}
          textAlign={{ base: "left", md: "left" }}
          display={{ md: "flex" }}
          maxWidth="32rem"
          borderWidth={1}
          margin={2}
          key={index}
        >
          <div>{comment.account.comment}</div>
        </Box>
      ))}
      <Stack>
        <Center>
          <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            <Spacer />
            {comments.length > page * 3 && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </HStack>
        </Center>
      </Stack>
    </div>
  )
}
