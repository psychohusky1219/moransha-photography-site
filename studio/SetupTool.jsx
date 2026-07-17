import {useEffect, useMemo, useState} from "react";
import {Box, Button, Card, Heading, Stack, Text} from "@sanity/ui";
import {RocketIcon} from "@sanity/icons";
import {useClient} from "sanity";
import seedText from "./seed/initial-content.ndjson?raw";

const initialDocuments = seedText
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));

export function SetupTool() {
  const client = useClient({apiVersion: "2025-02-19"});
  const [existingCount, setExistingCount] = useState(null);
  const [status, setStatus] = useState("");
  const [working, setWorking] = useState(false);
  const ids = useMemo(() => initialDocuments.map(({_id}) => _id), []);

  const refreshCount = async () => {
    const count = await client.fetch("count(*[_id in $ids])", {ids});
    setExistingCount(count);
  };

  useEffect(() => {
    refreshCount().catch(() => setStatus("Could not check the page records. Try refreshing the Studio."));
  }, []);

  const createMissingPages = async () => {
    setWorking(true);
    setStatus("");
    try {
      let transaction = client.transaction();
      initialDocuments.forEach((document) => {
        transaction = transaction.createIfNotExists(document);
      });
      await transaction.commit({autoGenerateArrayKeys: true});
      await refreshCount();
      setStatus("Website content is ready. Open Content to edit and publish pages.");
    } catch (error) {
      setStatus(error.message || "The setup could not be completed. Please try again.");
    } finally {
      setWorking(false);
    }
  };

  const ready = existingCount === initialDocuments.length;

  return (
    <Box padding={[3, 4, 5]} style={{maxWidth: 760, margin: "0 auto"}}>
      <Stack space={5}>
        <Stack space={3}>
          <Heading size={3}>MoranSha Website Editor</Heading>
          <Text size={2} muted>
            This Studio controls the wording, pricing, featured photos, contact details, FAQs, policies, portfolio galleries, and standalone landing pages on the website.
          </Text>
        </Stack>

        <Card padding={4} radius={2} shadow={1} tone={ready ? "positive" : "primary"}>
          <Stack space={4}>
            <Heading size={1}>{ready ? "Setup complete" : "Prepare the website pages"}</Heading>
            <Text>
              {existingCount === null
                ? "Checking the website content..."
                : `${existingCount} of ${initialDocuments.length} page records are ready.`}
            </Text>
            {!ready && (
              <Button
                fontSize={2}
                icon={RocketIcon}
                loading={working}
                onClick={createMissingPages}
                padding={3}
                text="Add missing website pages"
                tone="primary"
              />
            )}
            {status && <Text size={1}>{status}</Text>}
          </Stack>
        </Card>

        <Card padding={4} radius={2} border>
          <Stack space={3}>
            <Heading size={1}>How editing works</Heading>
            <Text>1. Open Content and choose a page.</Text>
            <Text>2. Change wording, upload or remove photos, or drag gallery photos into a new order.</Text>
            <Text>3. Click Publish. The website uses the newly published content automatically.</Text>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export const setupTool = {
  name: "start-here",
  title: "Start Here",
  icon: RocketIcon,
  component: SetupTool
};
