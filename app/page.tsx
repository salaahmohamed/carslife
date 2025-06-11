import { fetchCarsFromSupabase } from "@/lib/supabaseClient";
import type { FilterProps, HomeProps, CarProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import FilterControls from "@components/ClearButton";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: HomeProps) {
  async function fetchCars(filters: FilterProps): Promise<CarProps[]> {
    try {
      // Try fetching from Supabase
      let fetchedCars = await fetchCarsFromSupabase();

      // Filter Supabase cars according to filters
      fetchedCars = fetchedCars.filter((car) => {
        const matchesManufacturer = filters.manufacturer
          ? car.make.toLowerCase().includes(filters.manufacturer.toLowerCase())
          : true;

        const matchesModel = filters.model
          ? car.model.toLowerCase().includes(filters.model.toLowerCase())
          : true;

        const matchesYear =
          filters.year && filters.year !== 0 ? car.year === filters.year : true;

        const matchesFuel = filters.fuel
          ? car.fuel_type.toLowerCase() === filters.fuel.toLowerCase()
          : true;

        return (
          matchesManufacturer && matchesModel && matchesYear && matchesFuel
        );
      });

      return fetchedCars.slice(0, filters.limit || 10);
    } catch (error) {
      console.error("Failed to fetch cars from Supabase:", error);
      // No fallback, return empty array or propagate the error based on your preference
      return [];
    }
  }

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year ? Number(searchParams.year) : undefined,
    fuel: searchParams.fuel || "",
    limit: Number(searchParams.limit) || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>

          {/* Add Clear Filters button here */}
          <FilterControls />
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car, idx) => (
                <CarCard key={idx} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(Number(searchParams.limit) || 10) / 10}
              isNext={(Number(searchParams.limit) || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-xl font-bold text-black">Oops, no results</h2>
            <p>Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
