"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSurveyAnswers } from "@/queries/queries";

const questions = [
  {
    id: "q1",
    text: "What's the purpose of your trip?",
    type: "multiple choice",
    options: ["Business Trip", "Vacation", "Personal Trip"],
  },
  { id: "q2", text: "When are you traveling?", type: "date range" },
  { id: "q3", text: "How many people are traveling?", type: "number" },
  {
    id: "q4",
    text: "What's your preferred budget?",
    type: "multiple choice",
    options: ["Budget-friendly", "Mid-range", "Luxury"],
  },
  {
    id: "q5",
    text: "What's most important to you when traveling?",
    type: "multiple choice",
    options: [
      "Food & Dining",
      "Entertainment",
      "Activities & Tours",
      "Shopping",
      "A bit of everything",
    ],
  },
  {
    id: "q6",
    text: "What's your preferred flight class?",
    type: "multiple choice",
    options: ["Economy", "Premium", "First Class"],
  },
  {
    id: "q7",
    text: "Which best describes your travel style?",
    type: "multiple choice",
    options: [
      "Adventurer",
      "Foodie",
      "Culture Lover",
      "Relaxation Seeker",
      "Nightlife Enthusiast",
    ],
  },
  {
    id: "q8",
    text: "Any special interests or hobbies you'd like to explore?",
    placeholder: "e.g. wine tasting, art museums, hiking, etc.",
    type: "text",
  },
  {
    id: "q9",
    text: "Anything you'd like to avoid during your trip?",
    placeholder: "e.g. crowded places, tourist traps, etc.",
    type: "text",
  },
  {
    id: "q10",
    text: "Do you have any dietary preferences or restrictions?",
    placeholder: "e.g. vegetarian, gluten-free, nut allergies, etc.",
    type: "text",
  },
];

export default function QuestionCarousel({ threadId }: { threadId: string }) {
  const queryClient = useQueryClient();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const updateAnswer = (questionText: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionText]: answer,
    }));
  };

  const threadMutation = useMutation({
    mutationFn: () => updateSurveyAnswers(threadId, answers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`thread-${threadId}`] });
    },
  });

  const completeQuestionnaire = async () => await threadMutation.mutateAsync();

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: false,
        }}
      >
        <CarouselContent>
          {questions.map((question, index) => (
            <CarouselItem key={question.id}>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Question {index + 1} of {questions.length}
                    </h3>
                    <p className="text-lg">{question.text}</p>
                    <div className="space-y-2">
                      <Label htmlFor={`question-${question.id}`}>
                        {question.type !== "date range" ? "Your Answer" : ""}
                      </Label>
                      {question.type === "text" && (
                        <Input
                          id={`question-${question.id}`}
                          value={answers[question.text] || ""}
                          onChange={(e) =>
                            updateAnswer(question.text, e.target.value)
                          }
                          placeholder={question.placeholder}
                          className="w-full"
                          type={question.type === "text" ? "text" : "number"}
                        />
                      )}
                      {question.type === "number" && (
                        <Input
                          id={`question-${question.id}`}
                          value={answers[question.text] || ""}
                          onChange={(e) =>
                            updateAnswer(question.text, e.target.value)
                          }
                          className="w-full"
                          type="number"
                        />
                      )}
                      {question.type === "multiple choice" && (
                        <Select
                          value={answers[question.text] || ""}
                          onValueChange={(value) =>
                            updateAnswer(question.text, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="z-[60]">
                            {question.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {question.type === "date range" && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {date?.from ? (
                                date.to ? (
                                  <>
                                    {format(date.from, "MMM dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(date.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={(e) => {
                                setDate(e);
                                updateAnswer(
                                  question.text,
                                  `${format(
                                    e?.from ?? new Date(),
                                    "MMM dd, y"
                                  )} - ${format(
                                    e?.to ?? new Date(),
                                    "MMM dd, y"
                                  )}`
                                );
                              }}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-between mt-4 space-x-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            api?.scrollPrev();
            setCurrent(current - 1);
          }}
        >
          Back
        </Button>
        <Button
          className={`w-full ${
            current === questions.length
              ? "bg-blue-500 hover:bg-blue-400 transition"
              : ""
          }`}
          onClick={() => {
            api?.scrollNext();
            setCurrent(current + 1);
            if (current === questions.length) {
              completeQuestionnaire();
            }
          }}
        >
          {current === questions.length ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}
