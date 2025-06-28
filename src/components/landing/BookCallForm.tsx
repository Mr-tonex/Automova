
"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import Image from "next/image";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { submitBookCallForm, type BookCallFormState } from "@/actions/bookCall";
import { Clock, Loader2, Globe, Video, ArrowLeft, CheckCircle, Mail } from "lucide-react";

// Schema for the entire form
const bookCallFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().optional(),
});
type BookCallFormData = z.infer<typeof bookCallFormSchema>;

// Mock available time slots
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

export default function BookCallForm() {
  const { toast } = useToast();
  const [initialState, setInitialState] = useState<BookCallFormState>({ message: "", isSuccess: false });
  const [state, formAction, isPendingInternal] = useActionState<BookCallFormState, FormData>(submitBookCallForm, initialState);
  const [isSubmitting, startTransition] = useTransition();
  const isActuallyPending = isPendingInternal || isSubmitting;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const form = useForm<BookCallFormData>({
    resolver: zodResolver(bookCallFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    setIsClient(true);
    const defaultTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setSelectedTimezone(defaultTz);
    if (typeof Intl.supportedValuesOf === 'function') {
      setTimezones(Intl.supportedValuesOf('timeZone'));
    } else {
        setTimezones([defaultTz]);
    }
  }, []);

  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast({
          title: "Booking Confirmed!",
          description: state.message,
        });
      } else {
        toast({
          title: "Booking Failed",
          description: state.message + (state.issues ? ` Issues: ${state.issues.join(", ")}` : ""),
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const onFormSubmit = (data: BookCallFormData) => {
    if (!selectedDate || !selectedTime || !selectedTimezone) {
      toast({ title: "Missing Information", description: "Please ensure a date, time, and timezone are selected.", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("preferredDate", selectedDate.toISOString());
    formData.append("preferredTime", selectedTime);
    formData.append("timeZone", selectedTimezone);
    if (data.message) {
      formData.append("message", data.message);
    }
    
    startTransition(() => {
      formAction(formData);
    });
  };
  
  const resetBooking = () => {
    setSelectedTime(null);
    form.reset();
    setInitialState({ message: "", isSuccess: false });
  }

  if (!isClient) {
    return (
      <Card className="w-full max-w-5xl mx-auto shadow-2xl shadow-primary/20">
        <div className="p-2 min-h-[600px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl shadow-primary/20 bg-card overflow-hidden">
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] min-h-[600px]">
                {/* Left Info Panel */}
                <div className="col-span-1 bg-card p-6 flex flex-col border-r border-border">
                    <Link href="/" className="inline-block mb-6">
                        <Image src="/AutoMova 4k no bg.png" alt="AutoMova Logo" width={40} height={40}/>
                    </Link>
                    <h2 className="text-2xl font-bold text-foreground">AI Strategy Session</h2>
                    <p className="text-muted-foreground mt-2 mb-6">
                        Let's discuss your business challenges and map AI strategies in 30 minutes.
                    </p>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5" />
                            <span>30 minutes</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Video className="w-5 h-5" />
                            <span>Google Meet</span>
                        </div>
                    </div>
                    <div className="mt-auto pt-6 space-y-4">
                        <div>
                            <Label htmlFor="email" className="flex items-center gap-2 mb-1"><Mail className="w-4 h-4"/> Your Email</Label>
                            <Input id="email" type="email" {...form.register("email")} placeholder="you@example.com" disabled={!!selectedTime} />
                            {form.formState.errors.email && <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="timezone-select" className="flex items-center gap-2 mb-1"><Globe className="w-4 h-4" /> Timezone</Label>
                            <Select value={selectedTimezone} onValueChange={setSelectedTimezone} disabled={!!selectedTime}>
                                <SelectTrigger id="timezone-select">
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="h-72">
                                    {timezones.map(tz => (
                                        <SelectItem key={tz} value={tz}>{tz.replace(/_/g, " ")}</SelectItem>
                                    ))}
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Calendar or Form */}
                <div className="col-span-1 p-6 flex flex-col">
                {!selectedTime ? (
                    // Date & Time Selection
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    <div className="flex justify-center">
                        <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}
                        className="p-0"
                        />
                    </div>
                    {selectedDate && (
                        <div className="flex flex-col">
                        <p className="font-medium text-center lg:text-left mb-4">{format(selectedDate, "eeee, MMMM dd")}</p>
                        <ScrollArea className="flex-grow pr-3 h-72">
                            <div className="grid grid-cols-1 gap-2">
                            {timeSlots.map(time => (
                                <Button
                                key={time}
                                variant="outline"
                                className="w-full justify-center py-6 text-base"
                                onClick={() => handleTimeSelect(time)}
                                type="button"
                                >
                                {time}
                                </Button>
                            ))}
                            </div>
                        </ScrollArea>
                        </div>
                    )}
                    </div>
                ) : !state.isSuccess ? (
                    // User Details Form
                    <div>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground">Enter Your Details</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2">
                            <Clock className="w-4 h-4" />
                            <span>{format(selectedDate!, 'PPP')} at {selectedTime}</span>
                            <span className="text-xs">({selectedTimezone.replace(/_/g, " ")})</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" {...form.register("firstName")} disabled={isActuallyPending} className="mt-1" />
                                {form.formState.errors.firstName && <p className="text-destructive text-sm mt-1">{form.formState.errors.firstName.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" {...form.register("lastName")} disabled={isActuallyPending} className="mt-1" />
                                {form.formState.errors.lastName && <p className="text-destructive text-sm mt-1">{form.formState.errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="message">Additional Information (Optional)</Label>
                            <Textarea id="message" {...form.register("message")} disabled={isActuallyPending} className="mt-1" placeholder="Please share anything that will help prepare for our meeting." />
                        </div>
                        <div className="flex items-center gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => setSelectedTime(null)} disabled={isActuallyPending}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button type="submit" disabled={isActuallyPending} className="flex-grow">
                                {isActuallyPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                    </div>
                ) : (
                    // Success Message
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <CheckCircle className="w-16 h-16 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-foreground">Booking Confirmed!</h3>
                        <p className="text-muted-foreground mt-2 max-w-md">{state.message}</p>
                        <Button onClick={resetBooking} className="mt-6" type="button">
                            Schedule Another Meeting
                        </Button>
                    </div>
                )}
                </div>
            </div>
        </form>
    </Card>
  );
}
