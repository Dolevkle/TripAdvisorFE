import { createLazyFileRoute } from '@tanstack/react-router'
import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import useCurrentUser from "../hooks/useCurrentUser.tsx";
import {getPlacesByCity} from "../services/places-service.ts";
import {RadioGroup, Radio} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";



export const Route = createLazyFileRoute('/home/places')({
  component: Places,
})

const paris = "5194a2957b81c9024059ece5d2533f6d4840f00101f9016517010000000000c00208"
const berlin = "51a07312a518c72a40594e2b85402e424a40f00101f901d6f3000000000000c00208"
const barcelona = "51040fc292616b014059402bd5aa02b14440f00101f9012e4f050000000000c00207"
const rome = "51d71d41e037fc2840590095f01f66004540f00103f901a76aa87b0000000092030e56696c6c61206469204c69766961"
const telaviv = "51d9e66b3b1264414059e7edbe19eb0a4040f00101f9015e18150000000000c00208"

function Places () {
  const curus = useCurrentUser();
  const [selectedCity, setSelectedCity] = useState<string>(paris);

  const {data: places, isFetching, error} = useQuery({
    queryKey: ["getPlaces", selectedCity],
    queryFn: () => getPlacesByCity(selectedCity),
    retry: false
  })

  return(
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <RadioGroup
              label="Select your city"
              orientation="horizontal"
              value={selectedCity}
              onValueChange={setSelectedCity}
          >
            <Radio value={paris}>Paris</Radio>
            <Radio value={berlin}>Berlin</Radio>
            <Radio value={barcelona}>Barcelona</Radio>
            <Radio value={rome}>Rome</Radio>
            <Radio value={telaviv}>Tel-Aviv</Radio>
          </RadioGroup>
        </div>
      <div className="flex gap-4 grid grid-cols-3 grid-rows-3 px-4 py-2">
        {isFetching ? "Fetching..." : places?.map(place =>
            <Card className="py-4" style={{height: "250px", width: "300px"}}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{place.properties.city}</p>
                <small className="text-default-500">{place.properties.country}</small>
                <h4 className="font-bold text-large">{place.properties.name}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={place.properties.datasource.raw.image}
                    width={270}
                />
              </CardBody>
            </Card>
        )}

      </div>
      </div>
  )
}