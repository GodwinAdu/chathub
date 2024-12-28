import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import Navbar from "@/components/layout/sidebar/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  AssistantsProvider,
  ChatProvider,
  FiltersProvider,
  PromptsProvider,
} from "@/context";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <FiltersProvider>
        <AssistantsProvider>
          <PromptsProvider>
            <SidebarProvider>
              <>
                <AppSidebar />
                <SidebarInset>
                  <Navbar />
                    {children}
                </SidebarInset>
              </>
            </SidebarProvider>
          </PromptsProvider>
        </AssistantsProvider>
      </FiltersProvider>
    </ChatProvider>
  );
}
