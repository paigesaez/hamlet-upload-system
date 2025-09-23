'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Input,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  DatePicker,
  DateRangePicker,
  TimeInput,
  Slider,
  Progress,
  Chip,
  Badge,
  Avatar,
  AvatarGroup,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Accordion,
  AccordionItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Breadcrumbs,
  BreadcrumbItem,
  Code,
  Kbd,
  Snippet,
  Spinner,
  Skeleton,
  User,
  Spacer
} from '@heroui/react';
import { useState } from 'react';
import { parseDate } from '@internationalized/date';

export default function HeroUIShowcase() {
  const [selectedKey, setSelectedKey] = useState("1");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dateValue, setDateValue] = useState<any>(parseDate("2024-09-22"));
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [sliderValue, setSliderValue] = useState(50);
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const tableData = [
    { id: 1, name: "Tony Reichert", role: "CEO", status: "Active" },
    { id: 2, name: "Zoey Lang", role: "Technical Lead", status: "Paused" },
    { id: 3, name: "Jane Fisher", role: "Senior Developer", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">HeroUI Components Showcase</h1>

        {/* Navigation */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Navigation Components</h2>
          </CardHeader>
          <CardBody>
            <Navbar isBordered>
              <NavbarBrand>
                <p className="font-bold text-inherit">HEROUI</p>
              </NavbarBrand>
              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                  <Link color="foreground" href="#">Features</Link>
                </NavbarItem>
                <NavbarItem isActive>
                  <Link href="#" aria-current="page">Components</Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" href="#">Pricing</Link>
                </NavbarItem>
              </NavbarContent>
            </Navbar>

            <Spacer y={4} />

            <Breadcrumbs>
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Showcase</BreadcrumbItem>
            </Breadcrumbs>
          </CardBody>
        </Card>

        {/* Form Components */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Form Components</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                variant="flat"
                value={inputValue}
                onValueChange={setInputValue}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                type="password"
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Select an option"
                variant="flat"
                selectedKeys={selectValue ? [selectValue] : []}
                onSelectionChange={(keys) => setSelectValue(Array.from(keys)[0] as string)}
              >
                <SelectItem key="option1">Option 1</SelectItem>
                <SelectItem key="option2">Option 2</SelectItem>
                <SelectItem key="option3">Option 3</SelectItem>
              </Select>

              <Select
                label="Bordered Select"
                variant="bordered"
                placeholder="Choose an item"
              >
                <SelectItem key="item1">Item 1</SelectItem>
                <SelectItem key="item2">Item 2</SelectItem>
                <SelectItem key="item3">Item 3</SelectItem>
              </Select>
            </div>

            <Textarea
              label="Description"
              placeholder="Enter your description"
              variant="faded"
            />

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Date"
                variant="flat"
                value={dateValue}
                onChange={(value) => setDateValue(value)}
              />
              <TimeInput
                label="Event Time"
                variant="bordered"
              />
            </div>

            <DateRangePicker
              label="Stay duration"
              variant="bordered"
            />

            <div className="flex gap-4 items-center">
              <Checkbox isSelected={checkboxValue} onValueChange={setCheckboxValue}>
                Accept terms
              </Checkbox>
              <Switch isSelected={switchValue} onValueChange={setSwitchValue}>
                Enable notifications
              </Switch>
            </div>

            <RadioGroup
              label="Select your option"
              value={radioValue}
              onValueChange={setRadioValue}
            >
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
              <Radio value="3">Option 3</Radio>
            </RadioGroup>

            <Slider
              label="Volume"
              value={sliderValue}
              onChange={(value) => setSliderValue(value as number)}
              maxValue={100}
              className="max-w-md"
            />
          </CardBody>
        </Card>

        {/* Buttons & Actions */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Buttons & Actions</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button variant="solid" color="primary">Solid</Button>
              <Button variant="faded" color="primary">Faded</Button>
              <Button variant="bordered" color="primary">Bordered</Button>
              <Button variant="light" color="primary">Light</Button>
              <Button variant="flat" color="primary">Flat</Button>
              <Button variant="ghost" color="primary">Ghost</Button>
              <Button variant="shadow" color="primary">Shadow</Button>
            </div>

            <div className="flex gap-4">
              <Button color="default">Default</Button>
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="danger">Danger</Button>
            </div>

            <div className="flex gap-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">Open Menu</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">New file</DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem key="delete" className="text-danger" color="danger">
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button onPress={onOpen} color="primary">Open Modal</Button>
            </div>
          </CardBody>
        </Card>

        {/* Display Components */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Display Components</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Chip>Default</Chip>
              <Chip color="primary">Primary</Chip>
              <Chip color="secondary">Secondary</Chip>
              <Chip color="success">Success</Chip>
              <Chip color="warning">Warning</Chip>
              <Chip color="danger">Danger</Chip>
            </div>

            <div className="flex gap-4 items-center">
              <Badge content="5" color="primary">
                <Avatar name="JD" />
              </Badge>
              <AvatarGroup isBordered>
                <Avatar src="https://i.pravatar.cc/150?u=a" />
                <Avatar name="Jane" />
                <Avatar src="https://i.pravatar.cc/150?u=b" />
                <Avatar name="Joe" />
              </AvatarGroup>
              <User
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=c"
                }}
              />
            </div>

            <div className="flex gap-4">
              <Code>const hello = &quot;world&quot;;</Code>
              <Kbd>cmd</Kbd>
              <Kbd>shift</Kbd>
              <Kbd>K</Kbd>
            </div>

            <Snippet symbol="$">npm install @heroui/react</Snippet>

            <Progress value={70} label="Loading..." showValueLabel={true} className="max-w-md" />

            <div className="flex gap-4">
              <Tooltip content="I am a tooltip">
                <Button variant="bordered">Hover me</Button>
              </Tooltip>

              <Popover placement="right">
                <PopoverTrigger>
                  <Button variant="bordered">Click me</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">Popover Content</div>
                    <div className="text-tiny">This is the popover content</div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardBody>
        </Card>

        {/* Layout Components */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Layout Components</h2>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Options" selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(key as string)}>
              <Tab key="1" title="Photos">
                <Card>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="2" title="Music">
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="3" title="Videos">
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident.
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>

            <Spacer y={4} />

            <Accordion>
              <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                Default content for Accordion 1
              </AccordionItem>
              <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                Default content for Accordion 2
              </AccordionItem>
              <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                Default content for Accordion 3
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Table */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Table Component</h2>
          </CardHeader>
          <CardBody>
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Spacer y={4} />

            <Pagination total={10} initialPage={1} />
          </CardBody>
        </Card>

        {/* Loading States */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Loading States</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex gap-4">
              <Spinner />
              <Spinner color="primary" />
              <Spinner color="secondary" />
              <Spinner color="success" />
              <Spinner color="warning" />
              <Spinner color="danger" />
            </div>

            <div className="w-full space-y-3">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}