<template>
  <section>
    <div class="container py-[96px]">
      <h2

        class="text-2xl md:text-5xl font-semibold text-center mb-5"
      >
        Matta vs Traditional Procurement
      </h2>
      <p
       
        class="text-base md:text-2xl text-[#475467] text-center mb-10"
      >
        The Advantage is Clear
      </p>

      <div class="mx-auto max-w-4xl">
        <table
         
          class="w-full table-auto"
        >
          <thead>
            <tr>
              <th></th>
              <th
                class="border border-[#EAECF0] text-center px-4 py-[10px] text-xs md:text-sm lg:text-lg font-semibold rounded-tl-lg overflow-hidden"
              >
                Matta
              </th>
              <th
                class="border border-[#EAECF0] px-3 md:px-4 py-[10px] text-xs md:text-sm lg:text-lg font-semibold rounded-tr-lg"
              >
                Traditional procurement
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="first:border-t last:border-b border-r border-l border-[#EAECF0] rounded-t-lg odd:bg-[#F9FAFB]"
              v-for="i in traditionalData"
              :key="i.label"
            >
              <td class="px-3 md:px-6 py-5 text-[11px] md:text-sm font-medium">
                <span
                  class="flex items-center gap-x-1 p-1 cursor-pointer"
                  data-toggle="tooltip"
                  data-placement="top"
                  :title="i.info"
                >
                  {{ i.label }}
                  <AppIcon
                    icon="octicon:question-24"
                    iconClass="text-[#98A2B3]"
                  />
                </span>
              </td>
              <td
                class="px-3 md:px-4 py-5 text-[11px] md:text-sm border-l border-[#EAECF0] text-[#475467]"
              >
                {{ i.matta }}
              </td>
              <td
                class="px-3 md:px-4 py-5 text-[11px] md:text-sm border-l border-[#EAECF0] text-[#475467]"
              >
                {{ i.trad }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>