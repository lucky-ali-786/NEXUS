import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
            `}</style>
            {label && (<label className='inline-block mb-1 pl-1'>{label}</label>)}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                     apiKey='klaw1caoqws1kmyj0mbc1zre8f91s3exzrk7xpt4q98q5s6e'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | fontfamily fontsize | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            font_formats: "Baloo Bhai 2=Baloo Bhai 2,sans-serif; Poppins=Poppins,sans-serif; Inter=Inter,sans-serif; System Default=-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto',sans-serif; Roboto=Roboto,sans-serif; Georgia=Georgia,serif; Courier=Courier,monospace;",
                            content_style: `
                                @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
                                body { 
                                    font-family: 'Baloo Bhai 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; 
                                    font-size: 16px; 
                                    line-height: 1.6; 
                                    letter-spacing: 0.3px;
                                    font-weight: 500;
                                } 
                                p { 
                                    margin-bottom: 0.8em;
                                    font-weight: 500;
                                } 
                                h1, h2, h3, h4, h5, h6 { 
                                    font-family: 'Baloo Bhai 2', sans-serif;
                                    font-weight: 700;
                                    letter-spacing: -0.5px;
                                } 
                                strong, b { 
                                    font-weight: 700;
                                    font-family: 'Baloo Bhai 2', sans-serif;
                                }
                                a { 
                                    color: #3b82f6; 
                                    text-decoration: none; 
                                } 
                                a:hover { 
                                    text-decoration: underline; 
                                }
                            `
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </div>
    )
}
