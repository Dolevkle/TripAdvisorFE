import { createLazyFileRoute } from '@tanstack/react-router'
import {Card, CardBody, CardHeader, Spinner, Image} from "@nextui-org/react";
import useCurrentUser from "../hooks/useCurrentUser.tsx";
import {getPlacesByCity} from "../services/places-service.ts";
import {RadioGroup, Radio} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";



export const Route = createLazyFileRoute('/home/places')({
  component: Places,
})

const paris = "187147"
const berlin = "187323"
const barcelona = "187497"
const rome = "187791"
const amsterdam = "188590"

function Places () {
  const curus = useCurrentUser();
  const [selectedCity, setSelectedCity] = useState<string>(paris);
  const [places, setPlaces] = useState([]);

  const {data, isFetching, error} = useQuery({
    queryKey: ["getPlaces", selectedCity],
    queryFn: () => getPlacesByCity(selectedCity),
    retry: false,
    refetchInterval: false,
  })

    useEffect(() => {
        if (data) {
          setPlaces(Array.from({length: 9}, (_, index) => data[index]))
          }
    },[data])

    return (
        <div className="flex flex-col items-center justify-center m-5">
            <div className="flex items-center">
                <RadioGroup
                    className="flex items-center"
                    label="Select your city"
                    orientation="horizontal"
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                >
                    <Radio value={paris}>Paris</Radio>
                    <Radio value={berlin}>Berlin</Radio>
                    <Radio value={barcelona}>Barcelona</Radio>
                    <Radio value={rome}>Rome</Radio>
                    <Radio value={amsterdam}>Amsterdam</Radio>
                </RadioGroup>
            </div>
            {isFetching ? <Spinner style={{marginTop: "100px"}}/> :
            <div className="flex gap-4 grid grid-cols-3 grid-rows-3 px-4 py-2">
                {places.map(place =>
                    <Card className="py-4" style={{height: "240px", width: "320px"}}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <small className="text-default-500">{place.location_string}</small>
                            <h4 className="font-bold text-large">{place.name}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={place.photo.images.medium.url}
                                width={300}
                                height={120}
                                style={{overflow: "hidden", maxHeight: "130px"}}
                            />
                        </CardBody>
                    </Card>)}
            </div>
                    }
        </div>
    );
}