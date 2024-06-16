"use client";

import { getEventLists } from "@/apis/event";
import { AlertModal, Pagination } from "@/components/common";
import { EditModal, EventCard, Sort } from "@/components/event";
import { EventCardProps, SortByType, SortOrderType } from "@/types/event";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // event
  const [allEvents, setAllEvents] = useState<Array<EventCardProps>>([]); // 모든 이벤트
  const [filteredEvents, setFilteredEvents] = useState<Array<EventCardProps>>(
    []
  ); // 필터링된 이벤트
  const [events, setEvents] = useState<Array<EventCardProps>>([]); // 현재 보고있는 페이지의 이벤트
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(
    null
  ); // 수정, 삭제할 이벤트
  const [isFiltered, setIsFiltered] = useState(false); // 필터링 여부

  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // sort & filter
  const [sortBy, setSortBy] = useState<SortByType>("name"); // 정렬 기준
  const [sortOrder, setSortOrder] = useState<SortOrderType>("asc"); // 정렬 순서
  const [filterDateRange, setFilterDateRange] = useState({
    startDate: "",
    endDate: "",
  }); // 날짜 필터
  const [search, setSearch] = useState(""); // 검색어

  //modal
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const slice = 10; //한 페이지에 보여줄 이벤트 개수

  // fetching data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { eventList } = await getEventLists();
        setTotalPages(Math.ceil(eventList.length / slice));
        setAllEvents(eventList);
        setFilteredEvents(eventList);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    updateCurrentPage();
  }, [currentPage, allEvents, isFiltered, filteredEvents]);

  useEffect(() => {
    onClick.sort();
  }, [sortBy, sortOrder]);

  const updateCurrentPage = () => {
    const startIdx = (currentPage - 1) * slice;
    const endIdx = startIdx + slice;
    setEvents(
      (isFiltered ? filteredEvents : allEvents).slice(startIdx, endIdx)
    );
  };

  const onClick = {
    delete: (event: EventCardProps) => {
      setSelectedEvent(event);
      setIsAlertModalOpen(true);
    },
    sort: () => {
      const eventList = isFiltered ? filteredEvents : allEvents;
      const eventsCopy = [...eventList];

      switch (sortBy) {
        case "name":
          eventsCopy.sort((a, b) => {
            return sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
        case "date":
          eventsCopy.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          });
          break;
        default:
          break;
      }

      if (isFiltered) setFilteredEvents(eventsCopy);
      else setAllEvents(eventsCopy);
    },
    prev: () => {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    },
    next: () => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    deleteConfirm: () => {
      if (isFiltered) {
        setFilteredEvents((prev) => {
          const newEvents = prev.filter(
            (event) => event.id !== selectedEvent?.id
          );

          setTotalPages(Math.ceil(newEvents.length / slice));

          if ((currentPage - 1) * slice >= newEvents.length) {
            setCurrentPage((prev) => prev - 1);
          }

          return newEvents;
        });
      }
      setAllEvents((prev) => {
        const newEvents = prev.filter(
          (event) => event.id !== selectedEvent?.id
        );

        setTotalPages(Math.ceil(newEvents.length / slice));

        if ((currentPage - 1) * slice >= newEvents.length) {
          setCurrentPage((prev) => prev - 1);
        }

        return newEvents;
      });
      setIsAlertModalOpen(false);
      setSelectedEvent(null);
    },
    save: () => {
      if (selectedEvent) {
        if (isFiltered) {
          setFilteredEvents((prev) =>
            prev.map((event) =>
              event.id === selectedEvent.id ? selectedEvent : event
            )
          );
        }
        setAllEvents((prev) =>
          prev.map((event) =>
            event.id === selectedEvent.id ? selectedEvent : event
          )
        );
      }

      setIsEditModalOpen(false);
      setSelectedEvent(null);
    },
    edit: (event: EventCardProps) => {
      setSelectedEvent(event);
      setIsEditModalOpen(true);
    },
    applyDateFilter: () => {
      let filtered = allEvents;

      if (filterDateRange.startDate || filterDateRange.endDate) {
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date);
          const startDate = filterDateRange.startDate
            ? new Date(filterDateRange.startDate)
            : null;
          const endDate = filterDateRange.endDate
            ? new Date(filterDateRange.endDate)
            : null;

          if (startDate && endDate) {
            return eventDate >= startDate && eventDate <= endDate;
          } else if (startDate) {
            return eventDate >= startDate;
          } else if (endDate) {
            return eventDate <= endDate;
          }

          return true;
        });
      }

      if (search.trim() !== "") {
        const searchTerm = search.toLowerCase();
        filtered = filtered.filter((event) =>
          event.name.toLowerCase().includes(searchTerm)
        );
      }

      setFilteredEvents(filtered);
      setTotalPages(Math.ceil(filtered.length / slice));
      setCurrentPage(1);
      setIsFiltered(true);
    },
    clear: () => {
      setIsFiltered(false);
      setSearch("");
      setFilterDateRange({ startDate: "", endDate: "" });
      setFilteredEvents([]);
      setTotalPages(Math.ceil(allEvents.length / slice));
      setCurrentPage(1);
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div style={{ padding: 20 }}>
      <h1>Events {isFiltered ? filteredEvents.length : allEvents.length}</h1>
      <Sort
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        filterDateRange={filterDateRange}
        setFilterDateRange={setFilterDateRange}
        search={search}
        setSearch={setSearch}
        onApplyFilter={onClick.applyDateFilter}
        onClickClear={onClick.clear}
      />
      {events.map((event) => (
        <EventCard
          key={event.id}
          setEvents={setEvents}
          onDelete={() => onClick.delete(event)}
          onEdit={() => onClick.edit(event)}
          {...event}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPrevPage={onClick.prev}
        goToNextPage={onClick.next}
      />
      <EditModal
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        isModalOpen={isEditModalOpen && selectedEvent !== null}
        onCancel={() => setIsEditModalOpen(false)}
        onSave={onClick.save}
      />
      <AlertModal
        isModalOpen={isAlertModalOpen}
        onCancel={() => setIsAlertModalOpen(false)}
        onConfirm={onClick.deleteConfirm}
      />
    </div>
  );
}
