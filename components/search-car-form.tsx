"use client"

import * as React from "react"
import { format, isToday, startOfToday } from "date-fns"
import {
  CalendarIcon,
  MapPinIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { LOCATIONS, TIMES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SearchCarForm() {
  const [locationOpen, setLocationOpen] = React.useState(false)
  const [dateOpen, setDateOpen] = React.useState(false)
  const form = useForm({
    defaultValues: {
      location: "new-york",
      date: new Date(),
      time: "08:00",
      duration: 1,
    },
  })

  return (
    <form className="w-sm shrink-0 rounded-3xl bg-card p-6 text-card-foreground shadow-xl ring-1 ring-foreground/5">
      <FieldGroup className="gap-5">
        <Controller
          name="location"
          control={form.control}
          render={({ field }) => {
            const location = LOCATIONS.find(
              (item) => item.value === field.value
            )
            return (
              <Field>
                <FieldLabel
                  htmlFor="location"
                  className="font-normal text-muted-foreground"
                >
                  Location
                </FieldLabel>
                <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        id="location"
                        variant="outline"
                        className="h-12 w-full justify-start gap-3 rounded-xl border-border bg-muted/50 px-4 text-base font-normal hover:bg-muted [&_svg:not([class*='size-'])]:size-5"
                      />
                    }
                  >
                    <MapPinIcon
                      data-icon="inline-start"
                      className="text-muted-foreground"
                    />
                    {location?.label}
                    <span className="ml-auto">{location?.flag}</span>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-(--anchor-width) p-0"
                  >
                    <Command>
                      <CommandInput placeholder="Search location..." />
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                          {LOCATIONS.map((item) => (
                            <CommandItem
                              key={item.value}
                              value={item.label}
                              data-checked={item.value === field.value}
                              onSelect={() => {
                                field.onChange(item.value)
                                setLocationOpen(false)
                              }}
                            >
                              <span>{item.flag}</span>
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </Field>
            )
          }}
        />

        <Field>
          <FieldLabel
            htmlFor="date"
            className="font-normal text-muted-foreground"
          >
            Start date
          </FieldLabel>
          <div className="flex gap-3">
            <Controller
              name="date"
              control={form.control}
              render={({ field }) => (
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        id="date"
                        variant="outline"
                        className="h-12 flex-1 justify-start gap-3 rounded-xl border-border bg-muted/50 px-4 text-base font-normal hover:bg-muted [&_svg:not([class*='size-'])]:size-5"
                      />
                    }
                  >
                    <CalendarIcon
                      data-icon="inline-start"
                      className="text-muted-foreground"
                    />
                    {isToday(field.value)
                      ? "Today"
                      : format(field.value, "EEE, MMM d")}
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      required
                      selected={field.value}
                      disabled={{ before: startOfToday() }}
                      onSelect={(date) => {
                        field.onChange(date)
                        setDateOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            <Controller
              name="time"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    aria-label="Start time"
                    className="h-12! rounded-xl border-border bg-muted/50 px-4 text-base hover:bg-muted [&>svg:last-child]:hidden"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TIMES.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </Field>

        <Controller
          name="duration"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel
                htmlFor="duration"
                className="font-normal text-muted-foreground"
              >
                Duration
              </FieldLabel>
              <InputGroup className="h-12 rounded-xl border-border bg-muted/50 px-1 has-disabled:bg-muted/50 has-disabled:opacity-100">
                <InputGroupAddon>
                  <InputGroupButton
                    size="icon-sm"
                    className="[&_svg:not([class*='size-'])]:size-5"
                    aria-label="Decrease duration"
                    disabled={field.value <= 1}
                    onClick={() => field.onChange(field.value - 1)}
                  >
                    <MinusCircleIcon />
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupInput
                  id="duration"
                  readOnly
                  value={`${field.value} ${field.value === 1 ? "Day" : "Days"}`}
                  className="text-center text-base md:text-base"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-sm"
                    className="text-brand hover:text-brand [&_svg:not([class*='size-'])]:size-5"
                    aria-label="Increase duration"
                    onClick={() => field.onChange(field.value + 1)}
                  >
                    <PlusCircleIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Button
          type="button"
          variant="brand"
          className="h-12 rounded-xl text-base font-semibold"
        >
          Search Car
        </Button>
      </FieldGroup>
    </form>
  )
}
