"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { instance } from "@/lib/axios";
import { useState } from "react";

interface Movie {
  movie_id: number;
  title: string;
  eng_title?: string;
  year?: number;
  m_type?: string;
  status?: string;
  enter_date?: string;
  director?: string;
  company?: string;
}

const formSchema = z.object({
  title: z.string().optional(),
  director: z.string().optional(),
  year: z.string().optional(),
  state: z
    .enum([
      "개봉",
      "개봉예정",
      "개봉준비",
      "후반작업",
      "촬영진행",
      "촬영준비",
      "기타",
    ])
    .optional(),
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
});

export function ProfileForm() {
  const [data, setData] = useState<Movie[]>();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, director } = values;
    // const response = await instance.get("movies", {
    //   params: {
    //     title,
    //     director,
    //   },
    // });
    const data = await (
      await instance.post("movies", { title, director })
    ).data;
    setData(data);
  }

  return (
    <div className="flex flex-col w-full">
      <hr className="h-px my-8 bg-gray-300 border-0" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-8"
        >
          <div className="flex">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-1/2 flex items-center space-y-0">
                  <FormLabel className="shrink-0 mr-5">영화명</FormLabel>
                  <FormControl>
                    <Input placeholder="영화명" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="director"
              render={({ field }) => (
                <FormItem className="w-1/2 flex items-center space-y-0 ml-5">
                  <FormLabel className="shrink-0 mr-5">감독명</FormLabel>
                  <FormControl>
                    <Input placeholder="감독명" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">조회</Button>
        </form>
      </Form>
      <hr className="h-px my-8 bg-gray-300 border-0" />
      <span className="text-lg font-medium mb-10">검색 결과</span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>영화ID</TableHead>
            <TableHead>영화명</TableHead>
            <TableHead>영화명(영문)</TableHead>
            <TableHead>제작연도</TableHead>
            <TableHead>유형</TableHead>
            <TableHead>제작상태</TableHead>
            <TableHead>감독</TableHead>
            <TableHead>제작사</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((movie) => (
            <TableRow key={movie.movie_id}>
              <TableCell>{movie.movie_id}</TableCell>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.eng_title}</TableCell>
              <TableCell>{movie.year}</TableCell>
              <TableCell>{movie.m_type}</TableCell>
              <TableCell>{movie.status}</TableCell>
              <TableCell>{movie.director}</TableCell>
              <TableCell>{movie.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
