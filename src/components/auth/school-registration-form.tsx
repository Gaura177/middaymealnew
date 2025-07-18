"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolSchema, type SchoolValues } from "@/lib/auth/schemas";
import { Button } from "@/components/ui/button";
import { AuthFormField } from "./auth-form-field";
import { Building2, MapPin, Hash } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

interface State {
  id: string;
  name: string;
  code: string;
}

interface District {
  id: string;
  name: string;
}

interface Tehsil {
  id: string;
  name: string;
}

export function SchoolRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SchoolValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: "",
      streetAddress: "",
      pincode: "",
      stateId: "",
      districtId: "",
      tehsilId: "",
    },
  });

  const { watch, setValue } = form;
  const stateId = watch("stateId");
  const districtId = watch("districtId");

  // Reset dependent fields when parent selection changes
  const handleStateChange = (value: string) => {
    setValue("stateId", value);
    setValue("districtId", "");
    setValue("tehsilId", "");
  };

  const handleDistrictChange = (value: string) => {
    setValue("districtId", value);
    setValue("tehsilId", "");
  };

  const { data: states } = useQuery<{ states: State[] }>({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await apiClient.get("/api/locations/states");
      return response.data as { states: State[] };
    },
  });

  const { data: districts } = useQuery<{ districts: District[] }>({
    queryKey: ["districts", stateId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/locations/districts/${stateId}`);
      return response.data as { districts: District[] };
    },
    enabled: !!stateId,
  });

  const { data: tehsils } = useQuery<{ tehsils: Tehsil[] }>({
    queryKey: ["tehsils", districtId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/locations/tehsils/${districtId}`);
      return response.data as { tehsils: Tehsil[] };
    },
    enabled: !!districtId,
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(data: SchoolValues) {
    try {
      setIsLoading(true);
      await apiClient.post("/api/schools/register", data);
      router.push("/students");
    } catch (error: any) {
      form.setError("root", {
        message: error.message || "Failed to register school",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {errors.root.message}
        </div>
      )}

      <AuthFormField
        control={form.control}
        name="name"
        label="School Name"
        placeholder="Enter school name"
        icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
      />

      <AuthFormField
        control={form.control}
        name="streetAddress"
        label="Street Address"
        placeholder="Enter street address"
        icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
      />

      <AuthFormField
        control={form.control}
        name="pincode"
        label="Pincode"
        placeholder="Enter pincode"
        icon={<Hash className="h-4 w-4 text-muted-foreground" />}
      />

      <AuthFormField
       control={form.control}
       name="stateId"
       label="State"
       placeholder="Select state"
       type="select"
       options={states?.states.map((state: State) => ({
         id: state.id,
         name: state.name,
       })) || []}
       onChange={handleStateChange}
     />

      <AuthFormField
       control={form.control}
       name="districtId"
       label="District"
       placeholder="Select district"
       type="select"
       options={districts?.districts.map((district: District) => ({
         id: district.id,
         name: district.name,
       })) || []}
       onChange={handleDistrictChange}
       disabled={!stateId}
     />

      <AuthFormField
       control={form.control}
       name="tehsilId"
       label="Tehsil"
       placeholder="Select tehsil"
       type="select"
       options={tehsils?.tehsils.map((tehsil: Tehsil) => ({
         id: tehsil.id,
         name: tehsil.name,
       })) || []}
       disabled={!districtId}
     />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register School"}
      </Button>
    </form>
  );
}
